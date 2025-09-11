import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// Get all revenues
    router.get("/", async (_req: Request, res: Response) => {
      try {
        const result = await pool.query("SELECT * FROM revenue ORDER BY id DESC");
        res.json(result.rows);
      } catch (err) {
        res.status(500).json({
          error: err instanceof Error ? err.message : "Erreur inconnue",
        });
      }
    });

// Add revenue
router.post("/", async (req: Request, res: Response) => {
  const { user_id, source, amount, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO revenue (user_id, source, amount, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, source, amount, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Erreur inconnue",
    });
  }
});

// Edit revenue
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { source, amount, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE revenue SET source=$1, amount=$2, description=$3 WHERE id=$4 RETURNING *",
      [source, amount, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Erreur inconnue",
    });
  }
});

// Delete revenue
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM revenue WHERE id=$1", [id]);
    res.json({ message: "Revenu supprimé avec succès" });
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : "Erreur inconnue",
    });
  }
});

export default router;
