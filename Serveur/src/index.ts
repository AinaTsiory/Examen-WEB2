import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import revenueRoutes from "./routes/revenue";
import expensesRoutes from "./routes/expenses";
import categoriesRoutes from "./routes/categories";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/revenue", revenueRoutes);
app.use("/expenses", expensesRoutes);
app.use("/categories", categoriesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
