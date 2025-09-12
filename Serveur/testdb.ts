
import db from "./db"; 

async function testConnection() {
  try {
    const result = await db.query("SELECT NOW()"); 
    console.log("Connexion réussie ! Heure actuelle :", result.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("Erreur de connexion à la base :", err);
    process.exit(1);
  }
}

testConnection();
