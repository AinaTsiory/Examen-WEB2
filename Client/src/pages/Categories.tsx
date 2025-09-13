import { useState, useEffect } from "react";
import iconPlus from "../assets/icones/Plus_48px.png";
import iconEdit from "../assets/icones/edit.png";
import iconDelete from "../assets/icones/delete.png";
import iconMontant from "../assets/icones/Money Bag_50px.png";
// import iconDescription from "../assets/icones/Note_26px.png";
import iconfois from "../assets/icones/Multiply_64px.png";



export default function Categories() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
   const [showForm, setShowForm] = useState(false); // état pour afficher/masquer le formulaire
useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="absolute left-[255px] top-20 w-[1200px]" >
      {/* Bouton Ajouter */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowForm(true)} // afficher le formulaire
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-md transition px-6 py-2 hover:bg-gradient-to-t hover:cursor-pointer"
        >
          <img src={iconPlus} className="w-5 h-5" alt="" />
          Ajout catégorie
        </button>
      </div>

      {/* Liste des dépenses */}
      <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-100 p-3 rounded-t-lg font-semibold text-gray-500">
        <div>Date</div>
        <div>Catégorie</div>
        <div>Actions</div>
      </div>

      <div className="space-y-2">
        {categories.map(item => {
          return (
            <div key={item.id} className="grid md:grid-cols-5 gap-4 items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="text-gray-700">10-01-25</div>
              <div className="text-gray-700">{item.name}</div>
              <div className="flex gap-3">
                <button className="text-gray-500 border-2 border-solid p-1 rounded border-green-500 hover:cursor-pointer hover:bg-green-300 transition">
                  <img src={iconEdit} className="w-5 h-5" alt="" />
                </button>
                <button className="text-gray-500 border-2 border-solid p-1 rounded border-red-500 hover:cursor-pointer hover:bg-red-300 transition">
                  <img src={iconDelete} className="w-5 h-5" alt="" />
                </button>
              </div>
            </div>
          );
        })}
        {/* Exemple statique */}
        
      </div>

      {/* Formulaire modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50" >
          <div className="w-[400px] rounded bg-white border border-gray-300 shadow-[5px_5px_10px_rgba(0,0,0,0.4)] pt-4 px-7 pb-7 relative">
            <div className="flex justify-between mb-2">
              <h1 className="bg-gradient-to-t from-blue-700 to-blue-950 bg-clip-text text-transparent font-semibold text-xl">
                Ajout de la dépense
              </h1>
              <span
                className="cursor-pointer"
                onClick={() => setShowForm(false)} // fermer le formulaire
              >
                <img src={iconfois} alt="" className="w-7 h-7" />
              </span>
            </div>

            <hr className="mb-4 text-gray-400" />

            {/* Formulaire (statique) */}
            <form className="flex flex-col gap-5">
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-700"
                  placeholder="Entrer le montant ..."
                  required
                />
                <div className="absolute top-[0.5px] bg-gradient-to-r from-blue-500 to-blue-800 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                  <img src={iconMontant} className="w-6 h-6" alt="" />
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-md transition px-6 py-2 hover:bg-gradient-to-t hover:cursor-pointer">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
