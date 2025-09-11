import { Routes, Route} from "react-router-dom";
import Sidebar from "./components/Sidebar"; 
import Header from "./components/Header"; 
import Dashboard from "./pages/dashboard/Dashboard";
import Expenses from "./pages/Expenses/Expenses";
import Incomes from "./pages/icomes/Incomes";
import Categories from "./pages/Categories";
import Profil from "./pages/profil/Profil";
import Receipt from "./pages/Receipt";
import './App.css'

function App() {

   return (
    <div className="w-full h-screen m-0 p-0 ">
      < Header/>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/receipt" element={<Receipt />} />
      </Routes>
    </div>
  );
}

export default App


