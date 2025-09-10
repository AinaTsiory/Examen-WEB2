import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

// Test API
app.get('/', (req, res) => res.send('API fonctionne !'));

// ---------------- Revenue Routes ----------------

// Get all revenues
app.get('/revenue', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM revenue ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Erreur inconnue' });
  }
});

// Add revenue
app.post('/revenue', async (req, res) => {
  const { user_id, source, amount, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO revenue (user_id, source, amount, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, source, amount, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Erreur inconnue' });
  }
});

// Edit revenue
app.put('/revenue/:id', async (req, res) => {
  const { id } = req.params;
  const { source, amount, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE revenue SET source=$1, amount=$2, description=$3 WHERE id=$4 RETURNING *',
      [source, amount, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Erreur inconnue' });
  }
});

// Delete revenue
app.delete('/revenue/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM revenue WHERE id=$1', [id]);
    res.json({ message: 'Revenu supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Erreur inconnue' });
  }
});

// Launch server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
