-- expenses_full.sql
-- Script complet pour la base Expenses (users, categories, expenses, receipts, incomes)
-- Crée extension UUID, tables, contraintes, triggers, et fonction de résumé mensuel.

-- 1) Extension UUID pour identifiants
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2) Table users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3) Table default_categories (globales, pour peupler les catégories utilisateur)
CREATE TABLE IF NOT EXISTS default_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL
);

-- Seed : catégories par défaut (français)
INSERT INTO default_categories (name)
SELECT v FROM (VALUES
  ('Alimentation'),
  ('Transport'),
  ('Logement'),
  ('Santé'),
  ('Divertissement'),
  ('Services'),
  ('Éducation'),
  ('Voyages'),
  ('Shopping'),
  ('Autres')
) AS t(v)
ON CONFLICT DO NOTHING;

-- 4) Table categories (par utilisateur)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT uniq_user_category UNIQUE (user_id, lower(name))
);

-- 5) Trigger/function : copier categories par défaut lors de la création d'un user
CREATE OR REPLACE FUNCTION fn_copy_default_categories_to_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO categories (user_id, name, created_at)
  SELECT NEW.id, name, now() FROM default_categories;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_after_insert_user_copy_categories ON users;
CREATE TRIGGER trg_after_insert_user_copy_categories
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION fn_copy_default_categories_to_user();

-- 6) Table expenses
-- type: 'one-time' => use column "date"
--       'recurring' => use start_date (required) and optional end_date
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  type VARCHAR(20) NOT NULL CHECK (type IN ('one-time','recurring')),
  -- pour dépenses ponctuelles
  date DATE,
  -- pour dépenses récurrentes
  start_date DATE,
  end_date DATE,
  description TEXT,
  receipt_id UUID, -- lien facultatif vers table receipts
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT chk_type_dates CHECK (
    (type = 'one-time'  AND date IS NOT NULL AND start_date IS NULL AND end_date IS NULL)
    OR
    (type = 'recurring' AND start_date IS NOT NULL)
  ),
  CONSTRAINT chk_start_before_end CHECK (
    (end_date IS NULL) OR (start_date IS NULL) OR (start_date <= end_date)
  )
);

-- receipts table (métadonnées des fichiers)
CREATE TABLE IF NOT EXISTS receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  expense_id UUID UNIQUE REFERENCES expenses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL, -- chemin relatif sur serveur (ex: uploads/xxx.pdf)
  content_type VARCHAR(100),
  size_bytes INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Liaison receipt_id dans expenses (mise à jour possible via application)
ALTER TABLE expenses
  ADD CONSTRAINT fk_expense_receipt
  FOREIGN KEY (receipt_id) REFERENCES receipts(id) ON DELETE SET NULL;

-- 7) Table incomes (revenus)
CREATE TABLE IF NOT EXISTS incomes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  date DATE NOT NULL,
  source VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 8) Indexes utiles pour performance des requêtes par utilisateur et date
CREATE INDEX IF NOT EXISTS idx_expenses_user_date ON expenses (user_id, date);
CREATE INDEX IF NOT EXISTS idx_expenses_user_start_end ON expenses (user_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_incomes_user_date ON incomes (user_id, date);
CREATE INDEX IF NOT EXISTS idx_categories_user ON categories (user_id, lower(name));

-- 9) Fonction PL/pgSQL : résumé mensuel (incluant dépenses récurrentes)
-- Renvoie total_income, total_expense, balance pour l'utilisateur et le mois fourni
CREATE OR REPLACE FUNCTION get_monthly_summary(p_user_id UUID, p_month_date DATE)
RETURNS TABLE (
  month_start DATE,
  month_end DATE,
  total_income NUMERIC,
  total_expense NUMERIC,
  balance NUMERIC
) AS $$
DECLARE
  m_start DATE;
  m_end DATE;
BEGIN
  -- déterminer début/fin du mois
  m_start := date_trunc('month', p_month_date)::date;
  m_end := (m_start + INTERVAL '1 month')::date - 1;

  month_start := m_start;
  month_end := m_end;

  -- total revenus du mois
  SELECT COALESCE(SUM(amount),0) INTO total_income
  FROM incomes
  WHERE user_id = p_user_id
    AND date BETWEEN m_start AND m_end;

  -- total dépenses = ponctuelles dans le mois + récurrentes actives ce mois
  SELECT COALESCE(SUM(amount),0) INTO total_expense
  FROM expenses
  WHERE user_id = p_user_id
    AND (
      -- dépenses ponctuelles dans le mois
      (type = 'one-time' AND date BETWEEN m_start AND m_end)
      OR
      -- dépenses récurrentes actives ce mois (start_date <= month_end AND (end_date IS NULL OR end_date >= month_start))
      (type = 'recurring' AND start_date <= m_end AND (end_date IS NULL OR end_date >= m_start))
    );

  balance := total_income - total_expense;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql STABLE;

-- 10) Fonction qui renvoie alerte budget si dépenses > revenus
CREATE OR REPLACE FUNCTION get_monthly_alert(p_user_id UUID, p_month_date DATE)
RETURNS TABLE (
  alert BOOLEAN,
  message TEXT,
  total_income NUMERIC,
  total_expense NUMERIC
) AS $$
DECLARE
  s RECORD;
BEGIN
  SELECT * INTO s FROM get_monthly_summary(p_user_id, p_month_date);
  total_income := s.total_income;
  total_expense := s.total_expense;
  alert := (s.total_expense > s.total_income);
  IF alert THEN
    message := format('Vous avez dépassé votre budget mensuel de %s', to_char(s.total_expense - s.total_income, 'FM999999999.00'));
  ELSE
    message := 'Budget respecté';
  END IF;
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql STABLE;

-- 11) Exemple d'insertion tests (optionnel) : créer un user + catégories automatiquement peuplées + quelques données
-- Uncomment / personnaliser si tu veux tester localement.
-- INSERT INTO users (email, password_hash) VALUES ('test@example.com', 'hashdummy');
-- SELECT * FROM categories WHERE user_id = (SELECT id FROM users WHERE email='test@example.com');
-- INSERT INTO incomes (user_id, amount, date, source) VALUES ((SELECT id FROM users WHERE email='test@example.com'), 1500.00, '2025-08-01', 'Salaire');
-- INSERT INTO expenses (user_id, category_id, amount, type, date, description) VALUES (
--   (SELECT id FROM users WHERE email='test@example.com'),
--   (SELECT id FROM categories WHERE user_id=(SELECT id FROM users WHERE email='test@example.com') LIMIT 1),
--   50.00, 'one-time', '2025-08-10', 'Café'
-- );

-- 12) Sécurité / contraintes supplémentaires possibles (à implémenter côté application):
-- - Vérifier que categories.category.user_id == expenses.user_id lors de l'insertion/modification (logique applicative).
-- - Validation de la taille et du type du fichier uploadé (backend / multer).
-- - Gestion des droits d'accès pour receipts (vérifier user_id avant download).

-- FIN du script
