import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

export default function ExpensesPage() {
  const [refresh, setRefresh] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gestion des Dépenses</h1>
      <ExpenseForm
        onSuccess={() => setRefresh(!refresh)}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />
      <ExpenseList refresh={refresh} setEditingExpense={setEditingExpense} />
    </div>
  );
}
