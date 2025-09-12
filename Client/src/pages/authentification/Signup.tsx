import { useState } from "react";
import { signup } from "../../api/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(username, password);
      if (data.user) {
        setMessage("Inscription réussie ! Maintenant connecte-toi.");
      } else {
        setMessage(data.error || "Erreur serveur");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">Créer un compte</h1>

        <input
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition transform hover:-translate-y-0.5 shadow-md"
          type="submit"
        >
          S'inscrire
        </button>

        {message && (
          <p className="mt-2 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
