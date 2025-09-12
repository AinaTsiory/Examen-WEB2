import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { pool } from "../../db";

dotenv.config();

const router = express.Router();

interface AuthRequest extends Request {
  body: {
    username?: string;
    password?: string;
  };
}

router.post("/signup", async (req: AuthRequest, res: Response) => {
  const { username, password } = req.body;
  console.log("Signup reçu :", req.body);

  if (!username || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING *",
      [username, hash]
    );
    console.log("Utilisateur créé :", result.rows[0]);
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Erreur Signup :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/login", async (req: AuthRequest, res: Response) => {
  const { username, password } = req.body;
  console.log("Login reçu :", req.body);

  if (!username || !password) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: "Utilisateur introuvable" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error("Erreur Login :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
