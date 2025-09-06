import { NavLink } from "react-router-dom";
import Logo from "./../assets/logo/logo.png" 

export default function Sidebar() {
  return (
    <nav className="w-60 h-[100vh] absolute top-0 left-0 flex flex-col">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold underline"
            : "text-white hover:underline"
        }
      >
        <img src={Logo} 
        className="" alt="" />
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold underline"
            : "text-white hover:underline"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/incomes"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold underline"
            : "text-white hover:underline"
        }
      >
        Incomes
      </NavLink>
      <NavLink
        to="/expenses"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold underline"
            : "text-white hover:underline"
        }
      >
        Expenses
      </NavLink>
      <NavLink
        to="/profil"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold underline"
            : "text-white hover:underline"
        }
      >
        Profil
      </NavLink>
      <NavLink
        to="/receipt"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold underline"
            : "text-white hover:underline"
        }
      >
        Receipt
      </NavLink>
    </nav>
  );
}
