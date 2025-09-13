import { useState, useEffect } from "react";
import iconPlus from "../../assets/icones/Plus_48px.png";
import iconEdit from "../../assets/icones/edit.png";
import iconDelete from "../../assets/icones/delete.png";
import iconMontant from "../../assets/icones/Money Bag_50px.png";
import iconDescription from "../../assets/icones/Note_26px.png";
import iconfois from "../../assets/icones/Multiply_64px.png";
import iconAlert from "../../assets/icones/avertissement.png";

type Expense = {
  id_depense: number;
  utilisateur_id: number;
  categorie_id: number;
  montant: number;
  description: string;
  type: string;
  date_depense: string;
  date_debut: string;
  date_fin: string;
  date_creation: string;
};

export default function Expenses() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    utilisateur_id: 1,
    categorie_id: 1,
    montant: "",
    description: "",
    type: "one-time",
    date_depense: "",
    date_debut: "",
    date_fin: "",
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [deleteExpense, setDeleteExpense] = useState<Expense | null>(null);

  // Récupération des dépenses depuis le backend
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error(err));
  }, []);

  // Mise à jour des champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Ajouter ou modifier une dépense
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...formData,
      montant: parseFloat(formData.montant),
    };

    try {
      let res;
      if (editExpense) {
        res = await fetch(`http://localhost:5000/expenses/${editExpense.id_depense}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("http://localhost:5000/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (editExpense) {
          setExpenses(prev => prev.map(i => (i.id_depense === data.id_depense ? data : i)));
        } else {
          setExpenses(prev => [data, ...prev]);
        }
        setShowForm(false);
        setEditExpense(null);
        setFormData({
          utilisateur_id: 1,
          categorie_id: categories.length > 0 ? categories[0].id : 0,
          montant: "",
          description: "",
          type: "one-time",
          date_depense: "",
          date_debut: "",
          date_fin: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Pré-remplir le formulaire pour édition
  const handleEdit = (item: Expense) => {
    setEditExpense(item);
    setFormData({
      utilisateur_id: item.utilisateur_id,
      categorie_id: item.categorie_id,
      montant: item.montant.toString(),
      description: item.description,
      type: item.type,
      date_depense: item.date_depense,
      date_debut: item.date_debut,
      date_fin: item.date_fin,
    });
    setShowForm(true);
  };

  // Supprimer une dépense
  const handleDelete = async () => {
    if (!deleteExpense) return;
    try {
      const res = await fetch(`http://localhost:5000/expenses/${deleteExpense.id_depense}`, { method: "DELETE" });
      if (res.ok) {
        setExpenses(prev => prev.filter(i => i.id_depense !== deleteExpense.id_depense));
        setDeleteExpense(null);
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="absolute left-[255px] top-20 w-[1200px]">
      {/* Bouton Ajouter */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => { setShowForm(true); setEditExpense(null); }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-md px-6 py-2 hover:cursor-pointer hover:bg-gradient-to-t"
        >
          <img src={iconPlus} className="w-5 h-5" alt="" />
          Ajout de dépense
        </button>
      </div>

      {/* Liste des dépenses */}
      <div className="hidden md:grid grid-cols-7 gap-4 bg-gray-100 p-3 rounded-t-lg font-semibold text-gray-500">
        <div>Date</div>
        <div>Montant</div>
        <div>Catégorie</div>
        <div>Type</div>
        <div>Date début</div>
        <div>Date fin</div>
        <div>Actions</div>
      </div>
      <div className="space-y-2">
        {expenses.map(item => (
          <div key={item.id_depense} className="grid md:grid-cols-7 gap-4 items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="text-gray-700">{item.date_depense || "-"}</div>
            <div className="text-gray-800 font-medium">{item.montant} Ar</div>
            <div className="text-gray-700">
              {categories.find(c => c.id === item.categorie_id)?.name || "—"}
            </div>
            <div className="text-gray-600">{item.type}</div>
            <div className="text-gray-600">{item.date_debut || "-"}</div>
            <div className="text-gray-600">{item.date_fin || "-"}</div>
            <div className="flex gap-3">
              <button className="text-gray-500 border-2 border-green-500 p-1 rounded hover:bg-green-300 transition" onClick={() => handleEdit(item)} >
                <img src={iconEdit} className="w-5 h-5" alt="" />
              </button>
              <button className="text-gray-500 border-2 border-red-500 p-1 rounded hover:bg-red-300 transition" onClick={() => setDeleteExpense(item)} >
                <img src={iconDelete} className="w-5 h-5" alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="w-[400px] rounded bg-white border border-gray-300 shadow-[5px_5px_10px_rgba(0,0,0,0.4)] pt-4 px-7 pb-7 relative">
            <div className="flex justify-between mb-2">
              <h1 className="text-gray-400 font-semibold text-xl">{editExpense ? "Modifier la dépense" : "Ajout de dépense"}</h1>
              <span onClick={() => setShowForm(false)} className="cursor-pointer">
                <img src={iconfois} className="w-7 h-7" alt="" />
              </span>
            </div>
            <hr className="mb-4 text-gray-400" />
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="number"
                  name="montant"
                  value={formData.montant}
                  onChange={handleChange}
                  placeholder="Montant"
                  required
                  className="w-full border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-700"
                />
                <div className="absolute top-[0.5px] bg-gradient-to-r from-blue-500 to-blue-800 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                  <img src={iconMontant} className="w-6 h-6" alt="" />
                </div>
              </div>

              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-500"
                >
                  <option value="ponctuelle">Ponctuelle</option>
                  <option value="recurrente">Recurrente</option>
                </select>
                <div className="absolute top-[0.5px] bg-gradient-to-r from-blue-500 to-blue-800 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                  <img src={iconDescription} className="w-6 h-6" alt="" />
                </div>
              </div>
              <div className="relative">
                <select
                  name="categorie_id"
                  value={formData.categorie_id}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-500"
                  required
                >
                  <option value="">-- Choisir une catégorie --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute top-[0.5px] bg-gradient-to-r from-blue-500 to-blue-800 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                  <img src={iconMontant} className="w-6 h-6" alt="" />
                </div>
              </div>
              <div className="relative">
                <input
                  type="date"
                  name="date_depense"
                  value={formData.date_depense}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-700"
                />
                <div className="absolute top-[0.5px] bg-gradient-to-r from-blue-500 to-blue-800 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                  <img src={iconMontant} className="w-6 h-6" alt="" />
                </div>
              </div>

              <div className="relative flex gap-2">
                <input type="date" name="date_debut" value={formData.date_debut} onChange={handleChange} className="w-1/2 border border-gray-300 rounded pl-2 py-1" placeholder="Date début" />
                <input type="date" name="date_fin" value={formData.date_fin} onChange={handleChange} className="w-1/2 border border-gray-300 rounded pl-2 py-1" placeholder="Date fin" />
              </div>

              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full h-[33px] border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-700"
                />
                <div className="absolute top-[0.5px] bg-blue-500 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                  <img src={iconDescription} className="w-6 h-6" alt="" />
                </div>
              </div>

              <button type="submit" className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-md px-6 py-2 hover:bg-gradient-to-t">
                {editExpense ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal suppression */}
      {deleteExpense && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="w-[400px] rounded bg-white border border-gray-300 shadow-[5px_5px_10px_rgba(0,0,0,0.4)] p-4">
            <div className="w-full flex justify-end">
              <span onClick={() => setDeleteExpense(null)} className="cursor-pointer">
                <img src={iconfois} className="w-7 h-7" alt="" />
              </span>
            </div>
            <div className="flex justify-between items-center gap-5">
              <img src={iconAlert} alt="" className="w-25 h-25" />
              <div className="flex flex-col justify-end items-end gap-8">
                <p>Voulez-vous vraiment supprimer cette dépense ?</p>
                <button onClick={handleDelete} className="w-12 h-9 bg-blue-500 text-white rounded">
                  ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
