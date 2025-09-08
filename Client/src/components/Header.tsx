import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className=" bg-gray-100">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-red-500 font-bold underline"
            : "text-white hover:underline"
        }
      >
        Accueil
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-bold underline"
            : "text-white hover:underline"
        }
      >
        Utilisateurs
      </NavLink>
    </nav>
  );
}
