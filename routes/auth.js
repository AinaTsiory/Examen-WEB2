const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // ton fichier db.js
require('dotenv').config();

// Inscription
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log("Signup reçu :", req.body); // <-- log
  if (!username || !password) return res.status(400).json({ error: 'Champs manquants' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING *',
      [username, hash]
    );
    console.log("Utilisateur créé :", result.rows[0]); // <-- log
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Erreur Signup :", err); // <-- log détaillé
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log("Login reçu :", req.body); 
  if (!username || !password) return res.status(400).json({ error: 'Champs manquants' });

  try {
    const result = await db.query('SELECT * FROM users WHERE username=$1', [username]);
    console.log("Résultat DB :", result.rows); 
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: 'Utilisateur introuvable' });

    const valid = await bcrypt.compare(password, user.password_hash);
    console.log("Mot de passe correct ?", valid); 
    if (!valid) return res.status(400).json({ error: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    console.log("Token généré :", token); 
    res.json({ token });
  } catch (err) {
    console.error("Erreur Login :", err); 
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
