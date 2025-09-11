import { NavLink } from "react-router-dom";
import IconDashboard from "../assets/icones/Grid 2_48px.png"
import Iconprofil from "../assets/icones/Male User_50pxwhite.png"
import IconIncome from "../assets/icones/Bank_48px.png"
import IconExpense from "../assets/icones/Credit Card_50px.png"
import IconCategorie from "../assets/icones/Layers_50px.png"
import IconRecu from "../assets/icones/Download_48px.png"
import IconDeconnexion from "../assets/icones/Logout.png"
// import Logo1 from "../assets/logo/logo1.png"

export default function Sidebar() {
  return (
    <nav className="w-1/6 mt-15 h-[100vh] fixed top-[-60px] z-15 left-0  flex flex-col bg-gradient-to-t from-black via-blue-900 to-blue-950 p-5 gap-1 shadow-[3px_0_6px_rgba(0,0,0,0.3)]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 overflow-hidden flex justify-center items-center mb-5"
            : "text-white mb-5"
        }
      >
        <h1 className="text-blue-100 text-4xl font-semibold">SpendTrack</h1>
        {/* <img src={Logo1}
        className="w-40" alt="Logo" /> */}
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold 0 p-2.5 gap-2.5 text-gray-200 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-800 hover:text-white"
            : "flex justify-start items-center 0 p-2.5 gap-2.5 text-white font-semibold bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white hover:rounded-md"
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
            ? "flex justify-start items-center font-semibold 0 p-2.5 gap-2.5 text-gray-200 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-800 hover:text-white"
            : "flex justify-start items-center 0 p-2.5 gap-2.5 text-white font-semibold bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white hover:rounded-md"
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
            ? "flex justify-start items-center font-semibold 0 p-2.5 gap-2.5 text-gray-200 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-800 hover:text-white"
            : "flex justify-start items-center 0 p-2.5 gap-2.5 text-white font-semibold bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white hover:rounded-md"
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
            ? "flex justify-start items-center font-semibold 0 p-2.5 gap-2.5 text-gray-200 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-800 hover:text-white"
            : "flex justify-start items-center 0 p-2.5 gap-2.5 text-white font-semibold bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white hover:rounded-md"
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
            ? "flex justify-start items-center font-semibold 0 p-2.5 gap-2.5 text-gray-200 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-800 hover:text-white"
            : "flex justify-start items-center 0 p-2.5 gap-2.5 text-white font-semibold bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white hover:rounded-md"
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
            ? "flex justify-start items-center font-semibold 0 p-2.5 gap-2.5 text-gray-200 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-800 hover:text-white"
            : "flex justify-start items-center 0 p-2.5 gap-2.5 text-white font-semibold bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white hover:rounded-md"
        }
      >
        <img src={IconRecu} 
        className="w-5 h-5"
        alt="" />
        Réçu
      </NavLink>
      <NavLink
        to="/deconnexion"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold 0 p-2.5 gap-2.5 text-gray-200 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-800 hover:text-white"
            : "flex justify-start items-center 0 p-2.5 gap-2.5 text-white font-semibold bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 hover:text-white hover:rounded-md"
        }
      >
        <img src={IconDeconnexion} 
        className="w-5 h-5"
        alt="" />
        Déconnexion
      </NavLink>
    </nav>
  );
}
