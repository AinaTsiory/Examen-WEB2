import { useState, useEffect } from "react";
import iconPlus from "../../assets/icones/Plus_48px.png";
import iconEdit from "../../assets/icones/edit.png";
import iconDelete from "../../assets/icones/delete.png";
import iconIncome from "../../assets/icones/Bank Cards_64px.png";
import iconMontant from "../../assets/icones/Money Bag_50px.png";
import iconDescription from "../../assets/icones/Note_26px.png";
import iconfois from "../../assets/icones/Multiply_64px.png";
import iconAlert from "../../assets/icones/avertissement.png";

type Income = {
  id: number;
  user_id: number;
  source: string;
  amount: number;
  description: string;
  date_revenue: string;
};

export default function Incomes() {
  const [showForm, setShowForm] = useState(false);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [editIncome, setEditIncome] = useState<Income | null>(null);
  const [deleteIncome, setDeleteIncome] = useState<Income | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/revenue")
      .then(res => res.json())
      .then(data => setIncomes(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { source, amount: parseFloat(amount), description, user_id: 1 };

    try {
      let res;
      if (editIncome) {
        res = await fetch(`http://localhost:5000/revenue/${editIncome.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("http://localhost:5000/revenue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (editIncome) {
          setIncomes(prev => prev.map(i => (i.id === data.id ? data : i)));
        } else {
          setIncomes(prev => [data, ...prev]);
        }
        setShowForm(false);
        setEditIncome(null);
        setSource("");
        setAmount("");
        setDescription("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: Income) => {
    setEditIncome(item);
    setSource(item.source);
    setAmount(item.amount.toString());
    setDescription(item.description);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deleteIncome) return;
    try {
      const res = await fetch(`http://localhost:5000/revenue/${deleteIncome.id}`, { method: "DELETE" });
      if (res.ok) {
        setIncomes(prev => prev.filter(i => i.id !== deleteIncome.id));
        setDeleteIncome(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute left-[255px] top-20 w-[1195px]">
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => { setShowForm(true); setEditIncome(null); setSource(""); setAmount(""); setDescription(""); }}
        >
          <img src={iconPlus} className="w-5 h-5" alt="" />
          Add Income
        </button>
      </div>

      {/* Table Headers */}
      <div className="hidden md:grid grid-cols-5 gap-4 bg-gray-100 p-3 rounded-t-lg font-semibold text-gray-500">
        <div>Date</div>
        <div>Source</div>
        <div>Amount</div>
        <div>Description</div>
        <div>Actions</div>
      </div>

      {/* Revenues List */}
      <div className="space-y-2">
        {incomes.map(item => (
          <div key={item.id} className="grid md:grid-cols-5 gap-4 items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <div className="text-gray-700">{item.date_revenue.split("T")[0]}</div>
            <div className="text-gray-700">{item.source}</div>
            <div className="text-gray-800 font-medium">{item.amount} Ar</div>
            <div className="text-gray-600">{item.description}</div>
            <div className="flex gap-3">
              <button
                className="text-gray-500 border-2 border-solid p-1 rounded border-green-500 hover:cursor-pointer hover:bg-green-300 transition"
                onClick={() => handleEdit(item)}
              >
                <img src={iconEdit} className="w-5 h-5" alt="" />
              </button>
              <button
                className="text-gray-500 border-2 border-solid p-1 rounded border-red-500 hover:cursor-pointer hover:bg-red-300 transition"
                onClick={() => setDeleteIncome(item)}
              >
                <img src={iconDelete} className="w-5 h-5" alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {incomes.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          No incomes added yet
        </div>
      )}

      {/* Form Modal */}
      <div className={`fixed inset-0 bg-black/30 flex justify-center items-center ${showForm ? "block" : "hidden"}`}>
        <div className="w-[400px] rounded bg-white border border-gray-300 shadow-[5px_5px_10px_rgba(0,0,0,0.4)] pt-4 px-7 pb-7">
          <div className="flex justify-between mb-2">
            <h1 className="text-gray-400 font-semibold text-xl">{editIncome ? 'Modifier le revenu' : 'Ajout de revenu'}</h1>
            <span onClick={() => setShowForm(false)} className="cursor-pointer">
              <img src={iconfois} alt="" className="w-7 h-7"/>
            </span>
          </div>
          <hr className="mb-4 text-gray-400"/>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={source}
                onChange={e => setSource(e.target.value)}
                className="w-full border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-700"
                placeholder="Entrer la source de revenue ..."
                required
              />
              <div className="absolute top-[0.5px] bg-blue-500 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                <img src={iconIncome} className=" w-6 h-6" alt=""/>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-700"
                placeholder="Entrer le montant ..."
                required
              />
              <div className="absolute top-[0.5px] bg-blue-500 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                <img src={iconMontant} className=" w-6 h-6" alt=""/>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full h-[33px] border border-gray-300 rounded pl-9 py-1 focus:outline-none text-gray-700"
                placeholder="Entrer votre description..."
              ></textarea>
              <div className="absolute top-[0.5px] bg-blue-500 h-[33px] flex justify-center items-center rounded-tl rounded-bl px-1">
                <img src={iconDescription} className=" w-6 h-6" alt=""/>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 py-1 rounded text-blue-50 text-lg hover:bg-blue-400">
              {editIncome ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteIncome && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="w-[400px] rounded bg-white border border-gray-300 shadow-[5px_5px_10px_rgba(0,0,0,0.4)] p-4">
            <div className="w-full flex justify-end">
              <span onClick={() => setDeleteIncome(null)}  className="cursor-pointer ">
              <img src={iconfois} alt="" className="w-7 h-7 "/>
            </span>
            </div>
            <div className="flex justify-between items-center gap-5">
              <img src={iconAlert} alt="" className="w-25 h-25"/>
            <div className="flex flex-col justify-end items-end gap-8">
              <p className="">Voulez-vous vraiment supprimer ce revenu ?</p>
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
