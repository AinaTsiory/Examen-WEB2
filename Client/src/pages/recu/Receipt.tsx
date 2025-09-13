import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
export default function Receipt() {

  const { id } = useParams(); // récupère l'id depuis l'URL
  const [expense, setExpense] = useState<Expense | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/expenses/${id}`)
      .then(res => res.json())
      .then(data => setExpense(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!expense) return <p>Chargement du reçu...</p>;
  return (
    <div className=" absolute left-[255px] top-20 w-[1200px]">
      <h1 className="text-xl font-bold mb-4">Reçu de dépense</h1>
      <p><strong>Date :</strong> {expense.date_depense}</p>
      <p><strong>Montant :</strong> {expense.montant} Ar</p>
      <p><strong>Description :</strong> {expense.description}</p>
      <p><strong>Type :</strong> {expense.type}</p>
      <p><strong>Date début :</strong> {expense.date_debut || "-"}</p>
      <p><strong>Date fin :</strong> {expense.date_fin || "-"}</p>
      <p><strong>Date de création :</strong> {expense.date_creation}</p>

    </div>
  );
}
