import { deleteExpense, getExpenses } from "../../api/expensesApi";
import { useEffect, useState } from "react";

interface Props {
  refresh: boolean;
  setEditingExpense: (exp: any) => void;
}

export default function ExpenseList({ refresh, setEditingExpense }: Props) {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getExpenses();
      setExpenses(data);
    })();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    await deleteExpense(id);
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="text-lg font-semibold mb-3">Liste des Dépenses</h2>
      <ul className="space-y-2">
        {expenses.map((exp) => (
          <li key={exp.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">{exp.amount} Ar - {exp.type}</p>
              <p className="text-sm text-gray-600">{exp.description}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => setEditingExpense(exp)}
              >
                Modifier
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(exp.id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
