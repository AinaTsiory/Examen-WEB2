import { NavLink } from "react-router-dom";

import IconDashboard from "../assets/icones/Grid 2_48px.png"
import Iconprofil from "../assets/icones/Male User_50pxwhite.png"
import IconIncome from "../assets/icones/Bank_48px.png"
import IconExpense from "../assets/icones/Credit Card_50px.png"
import IconCategorie from "../assets/icones/Layers_50px.png"

export default function Sidebar() {
  return (
    <nav className="w-1/6 mt-15 h-[100vh] fixed top-0 left-0 flex flex-col bg-blue-950 p-5 gap-1 shadow-[3px_0_6px_rgba(0,0,0,0.3)]">
     
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-white bg-blue-100 border-l-4 border-blue-500 p-2.5 gap-2.5"
            : "flex justify-start items-center text-white font-semibold p-2.5 gap-2.5 hover:text-green-700"
        }
      >
        <img src={IconDashboard} 
        className="w-5 h-5"
        alt="" />
        Dashboard
      </NavLink>
      <NavLink
        to="/incomes"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-white bg-blue-100 border-l-4 border-blue-500 p-2.5 gap-2.5"
            : "flex justify-start items-center text-white font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100"
        }
      >
        <img src={IconIncome} 
        className="w-5 h-5"
        alt="" />
        Incomes
      </NavLink>
      <NavLink
        to="/expenses"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-white bg-blue-100 border-l-4 border-blue-500 p-2.5 gap-2.5"
            : "flex justify-start items-center text-white font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100"
        }
      >
        <img src={IconExpense} 
        className="w-5 h-5"
        alt="" />
        Expenses
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-white bg-blue-100 border-l-4 border-blue-500 p-2.5 gap-2.5"
            : "flex justify-start items-center text-white font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100"
        }
      >
        <img src={IconCategorie} 
        className="w-5 h-5"
        alt="" />
        Categories
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-white bg-blue-100 border-l-4 border-blue-500 p-2.5 gap-2.5"
            : "flex justify-start items-center text-white font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100"
        }
      >
        <img src={Iconprofil} 
        className="w-5 h-5"
        alt="" />
        Profil
      </NavLink>
      <NavLink
        to="/receipt"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-white bg-blue-100 border-l-4 border-blue-500 p-2.5 gap-2.5"
            : "flex justify-start items-center text-white font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-500 hover:bg-blue-100"
        }
      >
        Receipt
      </NavLink>
    </nav>
  );
}
