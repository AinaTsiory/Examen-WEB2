const db = require("./db");
const bcrypt = require("bcrypt");

async function seed() {
  try {
    const username = "andy";
    const password = "Andy 3003"; 
    const password_hash = await bcrypt.hash(password, 10);

    const res = await db.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *",
      [username, password_hash]
    );

    console.log("Utilisateur créé :", res.rows[0]);
  } catch (err) {
    console.error("Erreur :", err);
  } finally {
    db.end();
  }
}

seed();
