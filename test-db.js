const db = require("./db"); // on importe ton fichier db.js

async function test() {
  try {
    const res = await db.query("SELECT NOW()");
    console.log("Connexion OK :", res.rows[0]);
  } catch (err) {
    console.error("Erreur DB :", err);
  } finally {
    db.end(); // ferme la connexion
  }
}

test();
