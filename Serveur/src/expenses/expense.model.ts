export interface Expense {
  id?: string;
  user_id: string;
  category_id: string;
  amount: number;
  type: "one-time" | "recurring";
  date?: string;
  start_date?: string;
  end_date?: string | null;
  description?: string;
  receipt_id?: string | null;
  created_at?: string;
  updated_at?: string;
}
