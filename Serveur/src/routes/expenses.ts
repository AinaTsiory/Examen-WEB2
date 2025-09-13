// // routes/expenses.ts
// import { Router } from "express";
// import { pool } from "../db"; // <-- connexion PostgreSQL
// const router = Router();

// // Ajouter une dépense
// router.post("/", async (req, res) => {
//   try {
//     const {
//       utilisateur_id,
//       categorie_id,
//       montant,
//       description,
//       type,
//       date_depense,
//       date_debut,
//       date_fin,
//     } = req.body;

//     const result = await pool.query(
//       `INSERT INTO depenses (utilisateur_id, categorie_id, montant, description, type, date_depense, date_debut, date_fin) 
//        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
//       [
//         utilisateur_id,
//         categorie_id,
//         montant,
//         description,
//         type,
//         date_depense,
//         date_debut,
//         date_fin,
//       ]
//     );

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("Erreur lors de l'insertion :", err);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });

// // Récupérer toutes les dépenses
// router.get("/", async (_req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM depenses ORDER BY id_depense DESC");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Erreur lors de la récupération :", err);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// });
// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { utilisateur_id, categorie_id, montant, description, type, date_depense, date_debut, date_fin } = req.body;
//   try {
//     const result = await pool.query(
//       `UPDATE depenses SET utilisateur_id=$1, categorie_id=$2, montant=$3, description=$4, type=$5, 
//        date_depense=$6, date_debut=$7, date_fin=$8 WHERE id_depense=$9 RETURNING *`,
//       [utilisateur_id, categorie_id, montant, description, type, date_depense || null, date_debut || null, date_fin || null, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erreur lors de la modification de la dépense" });
//   }
// });

// // DELETE /expenses/:id -> supprimer une dépense
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query("DELETE FROM depenses WHERE id_depense=$1", [id]);
//     res.sendStatus(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erreur lors de la suppression de la dépense" });
//   }
// });
// export default router;

import { Router } from "express";
import {pool} from "../db"; // Assure-toi d'avoir un pool PostgreSQL configuré

const router = Router();

// GET toutes les dépenses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM depenses ORDER BY date_creation DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET une dépense par ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM depenses WHERE id_depense=$1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Dépense non trouvée" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST une nouvelle dépense
router.post("/", async (req, res) => {
  const { utilisateur_id, categorie_id, montant, description, type, date_depense, date_debut, date_fin } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO depenses 
       (utilisateur_id, categorie_id, montant, description, type, date_depense, date_debut, date_fin)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [utilisateur_id, categorie_id, montant, description, type, date_depense || null, date_debut || null, date_fin || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { utilisateur_id, categorie_id, montant, description, type, date_depense, date_debut, date_fin } = req.body;
  try {
    const result = await pool.query(
      `UPDATE depenses SET 
        utilisateur_id=$1,
        categorie_id=$2,
        montant=$3,
        description=$4,
        type=$5,
        date_depense=$6,
        date_debut=$7,
        date_fin=$8
      WHERE id_depense=$9 RETURNING *`,
      [utilisateur_id, categorie_id, montant, description, type, date_depense, date_debut, date_fin, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE (supprimer une dépense)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM depenses WHERE id_depense=$1", [id]);
    res.json({ message: "Dépense supprimée" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
