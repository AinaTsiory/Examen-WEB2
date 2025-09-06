import { NavLink } from "react-router-dom";
import Logo1 from "../assets/logo/logo1.png"
import IconDashboard from "../assets/icones/bullet-point.png"
export default function Sidebar() {
  return (
    <nav className="w-1/6 h-[100vh] absolute top-0 left-0 flex flex-col bg-white p-5 gap-1">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 pb-5 overflow-hidden w-full flex justify-center items-center"
            : "text-white hover:underline"
        }
      >
        <img src={Logo1}
        className="" alt="Logo" />
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-gray-800 bg-blue-100 border-l-4 border-blue-400 p-2.5 gap-2.5"
            : "flex justify-start items-center text-gray-800 font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-400 hover:bg-blue-100"
        }
      >
        <img src={IconDashboard} 
        className="w-6 h-6"
        alt="" />
        Dashboard
      </NavLink>
      <NavLink
        to="/incomes"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-gray-800 bg-blue-100 border-l-4 border-blue-400 p-2.5 gap-2.5"
            : "flex justify-start items-center text-gray-800 font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-400 hover:bg-blue-100"
        }
      >
        Incomes
      </NavLink>
      <NavLink
        to="/expenses"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-gray-800 bg-blue-100 border-l-4 border-blue-400 p-2.5 gap-2.5"
            : "flex justify-start items-center text-gray-800 font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-400 hover:bg-blue-100"
        }
      >
        Expenses
      </NavLink>
      <NavLink
        to="/categories."
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-gray-800 bg-blue-100 border-l-4 border-blue-400 p-2.5 gap-2.5"
            : "flex justify-start items-center text-gray-800 font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-400 hover:bg-blue-100"
        }
      >
        Categories
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-gray-800 bg-blue-100 border-l-4 border-blue-400 p-2.5 gap-2.5"
            : "flex justify-start items-center text-gray-800 font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-400 hover:bg-blue-100"
        }
      >
        Profil
      </NavLink>
      <NavLink
        to="/receipt"
        className={({ isActive }) =>
          isActive
            ? "flex justify-start items-center font-semibold text-gray-800 bg-blue-100 border-l-4 border-blue-400 p-2.5 gap-2.5"
            : "flex justify-start items-center text-gray-800 font-semibold p-2.5 gap-2.5 hover:border-l-4 hover:border-blue-400 hover:bg-blue-100"
        }
      >
        Receipt
      </NavLink>
    </nav>
  );
}
