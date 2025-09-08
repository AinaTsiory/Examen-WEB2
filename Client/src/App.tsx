import { Routes, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar"; 
import Header from "./components/Header"; 
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import Profil from "./pages/Profil";
import Receipt from "./pages/Receipt";
import './App.css'

function App() {

   return (
    <div className="p-6">
      < Header/>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </div>
  );
}


export default function App() {
