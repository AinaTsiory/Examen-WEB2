import axios from "axios";

const API_URL = "http://localhost:5000/api/expenses"; // 🔗 backend

export const getExpenses = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getExpenseById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createExpense = async (formData: FormData) => {
  const res = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateExpense = async (id: string, formData: FormData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteExpense = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
