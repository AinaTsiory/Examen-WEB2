
import express, { Request, Response } from "express";
import auth from "../middleware/auth";
import { pool } from "../../db";
const router = express.Router();

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

router.get("/me", auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Utilisateur non authentifié" });

    const result = await pool.query(
      "SELECT id, username, full_name, created_at FROM users WHERE id=$1",
      [req.user.id]
    );
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });

    res.json(user);
  } catch (err) {
    console.error("Erreur profil :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
