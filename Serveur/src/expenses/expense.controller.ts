import { Request, Response } from "express";
import { pool } from "../db/db";
import { Expense } from "./expense.model";

// 📌 Lister toutes les dépenses
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // injecté via auth middleware
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des dépenses" });
  }
};

// 📌 Obtenir une dépense par ID
export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM expenses WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Dépense introuvable" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération de la dépense" });
  }
};

// 📌 Créer une dépense
export const createExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const {
      category_id,
      amount,
      type,
      date,
      start_date,
      end_date,
      description,
    } = req.body;

    let receiptId = null;
    if (req.file) {
      const receipt = await pool.query(
        "INSERT INTO receipts (expense_id, user_id, file_name, file_path, content_type, size_bytes) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING id",
        [userId, req.file.originalname, req.file.path, req.file.mimetype, req.file.size]
      );
      receiptId = receipt.rows[0].id;
    }

    const result = await pool.query(
      `INSERT INTO expenses (user_id, category_id, amount, type, date, start_date, end_date, description, receipt_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [userId, category_id, amount, type, date, start_date, end_date, description, receiptId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création de la dépense" });
  }
};

// 📌 Mettre à jour une dépense
export const updateExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const {
      category_id,
      amount,
      type,
      date,
      start_date,
      end_date,
      description,
    } = req.body;

    let receiptId = null;
    if (req.file) {
      const receipt = await pool.query(
        "INSERT INTO receipts (expense_id, user_id, file_name, file_path, content_type, size_bytes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id",
        [id, userId, req.file.originalname, req.file.path, req.file.mimetype, req.file.size]
      );
      receiptId = receipt.rows[0].id;
    }

    const result = await pool.query(
      `UPDATE expenses
       SET category_id=$1, amount=$2, type=$3, date=$4, start_date=$5, end_date=$6, description=$7, receipt_id=$8, updated_at=NOW()
       WHERE id=$9 AND user_id=$10
       RETURNING *`,
      [category_id, amount, type, date, start_date, end_date, description, receiptId, id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Dépense introuvable ou non autorisée" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de la dépense" });
  }
};

// 📌 Supprimer une dépense
export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Dépense introuvable" });
    }

    res.json({ message: "Dépense supprimée" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression de la dépense" });
  }
};
