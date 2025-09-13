import express from "express";
import {pool} from "../db"; // ton pool PostgreSQL déjà configuré

const router = express.Router();

// GET /categories → récupérer toutes les catégories
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_categorie AS id, nom AS name FROM categories ORDER BY id_categorie"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
