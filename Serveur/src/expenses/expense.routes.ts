import { Router } from "express";
import {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./expense.controller";
import upload from "../middleware/uploadMiddleware";

const router = Router();

// Toutes les routes nécessitent l'auth middleware (ex: JWT)
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", upload.single("receipt"), createExpense);
router.put("/:id", upload.single("receipt"), updateExpense);
router.delete("/:id", deleteExpense);

export default router;
