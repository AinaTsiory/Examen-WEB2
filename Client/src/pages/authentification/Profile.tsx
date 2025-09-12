import { useEffect, useState } from "react";
import { getProfile } from "../../api/auth";
import photo_login from "../../assets/images/Login.jpeg";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Vous devez être connecté !");
      return;
    }

    getProfile(token)
      .then((data) => {
        if (data.error) setMessage(data.error);
        else setUser(data);
      })
      .catch(() => setMessage("Erreur serveur"));
  }, []);

  if (message)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-400 via-pink-300 to-indigo-400">
        <p className="text-white text-xl font-semibold bg-red-600/70 px-6 py-4 rounded shadow-lg">
          {message}
        </p>
      </div>
    );

  return (
    <div className="flex justify-center bg-gradient-to-b from-purple-400 via-pink-300 to-indigo-400 min-h-screen p-10">
      {user ? (
        <div className="bg-white bg-opacity-90 backdrop-blur-md w-full max-w-xl h-[600px] mt-24 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-gray-700">
         
          <img
            src={photo_login}
            alt="Profil"
            className="w-32 h-32 rounded-full shadow-lg -mt-16 mb-6"
          />

          <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
            Profil Utilisateur
          </h1>

          <div className="flex flex-col justify-center space-y-4 text-lg w-3/4">
            <p>
              <span className="font-semibold">ID:</span> {user.id}
            </p>
            <p>
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold">Full Name:</span> {user.full_name || "Non renseigné"}
            </p>
            <p>
              <span className="font-semibold">Créé le:</span> {new Date(user.created_at).toLocaleString()}
            </p>
          </div>

          <button
            className="mt-8 bg-purple-600 text-white py-3 px-10 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            onClick={() => alert("Future action!")}
          >
            Modifier Profil
          </button>
        </div>
      ) : (
        <p className="text-white text-xl mt-20">Chargement...</p>
      )}
    </div>
  );
}
