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
  password: String(process.env.DB_PASS),
  port: Number(process.env.DB_PORT),
});

// Route test
app.get('/', (req, res) => {
  res.send('API fonctionne !');
});

// Route pour récupérer les utilisateurs
app.get('/utilisateurs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM utilisateurs ORDER BY id_utilisateur DESC');
    res.json(result.rows);
  } catch (err: unknown) {
    if (err instanceof Error) res.status(500).json({ error: err.message });
    else res.status(500).json({ error: 'Erreur inconnue' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
