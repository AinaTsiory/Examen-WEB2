import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../api/auth";
import photo_login from "../../assets/images/logo_spend_track.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Connexion réussie !");
        navigate("/dashboard");
      } else {
        setMessage(data.error || "Erreur serveur");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-purple-400 via-pink-300 to-indigo-400">
      <form
        className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-80 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {/* Photo en haut */}
        <img src={photo_login} alt="Logo" className="w-24 h-24 mb-6 rounded-full shadow-lg" />

        <h1 className="text-3xl font-bold mb-6 text-purple-700">Connexion</h1>

        <input
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-purple-600 text-white p-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          type="submit"
        >
          Se connecter
        </button>

        <p className="mt-4 text-center text-sm text-gray-700">
          Pas encore inscrit ?{" "}
          <Link to="/signup" className="text-purple-700 font-semibold hover:underline">
            Créer un compte
          </Link>
        </p>

        {message && <p className="mt-3 text-center text-red-500 font-medium">{message}</p>}
      </form>
    </div>
  );
}
