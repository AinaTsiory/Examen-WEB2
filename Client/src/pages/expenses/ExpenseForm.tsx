import { useState } from "react";
import { createExpense, updateExpense } from "../../api/expensesApi";

interface Props {
  onSuccess: () => void;
  editingExpense?: any;
  setEditingExpense?: (exp: any | null) => void;
}

export default function ExpenseForm({ onSuccess, editingExpense, setEditingExpense }: Props) {
  const [form, setForm] = useState({
    category_id: editingExpense?.category_id || "",
    amount: editingExpense?.amount || "",
    type: editingExpense?.type || "one-time",
    date: editingExpense?.date || "",
    start_date: editingExpense?.start_date || "",
    end_date: editingExpense?.end_date || "",
    description: editingExpense?.description || "",
  });
  const [receipt, setReceipt] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });
    if (receipt) formData.append("receipt", receipt);

    if (editingExpense) {
      await updateExpense(editingExpense.id, formData);
      setEditingExpense && setEditingExpense(null);
    } else {
      await createExpense(formData);
    }

    setForm({
      category_id: "",
      amount: "",
      type: "one-time",
      date: "",
      start_date: "",
      end_date: "",
      description: "",
    });
    setReceipt(null);
    onSuccess();
  };

  return (
    <form className="p-4 bg-white shadow rounded space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
        placeholder="Catégorie ID"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Montant"
        className="w-full border p-2 rounded"
        required
      />
      <select name="type" value={form.type} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="one-time">Unique</option>
        <option value="recurring">Récurrente</option>
      </select>

      {form.type === "one-time" ? (
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      ) : (
        <>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </>
      )}

      <textarea
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <input type="file" onChange={(e) => e.target.files && setReceipt(e.target.files[0])} />

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {editingExpense ? "Mettre à jour" : "Ajouter"}
      </button>
    </form>
  );
}
