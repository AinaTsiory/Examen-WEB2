import { NavLink } from "react-router-dom";
import setting from "../assets/icones/icon-settign.png"
import user from "../assets/icones/users.png"
import Logo1 from "../assets/logo/logo1.png"
import chevron from "../assets/icones/Chevron Down_50px.png"

export default function Header() {
  return (
    <div className="w-screen bg-white fixed right-0 top-0 p-4 flex justify-between items-center  z-10 shadow-[0px_3px_5px_rgba(0,0,0,0.3)]">
       <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 overflow-hidden flex justify-center items-center "
            : "text-white hover:underline "
        }
      >
        <img src={Logo1}
        className="w-40" alt="Logo" />
      </NavLink>
      <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-950 text-2xl font-semibold  w-[980px]"
              : "hidden"
          }
        >Tableau de board</NavLink>
      <NavLink
          to="/incomes"
          className={({ isActive }) =>
            isActive
              ? "text-blue-950 text-2xl font-semibold w-[980px]"
              : "hidden"
          }
        >Revenues</NavLink>
      <NavLink
          to="/expenses"
          className={({ isActive }) =>
            isActive
              ? "text-blue-950 text-2xl font-semibold w-[980px]"
              : "hidden"
          }
        >Depenses</NavLink>
      <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive
              ? "text-blue-950 text-2xl font-semibold w-[980px]"
              : "hidden"
          }
        >Catégories</NavLink>
      <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive
              ? "text-blue-950 text-2xl font-semibold w-[980px]"
              : "hidden"
          }
        >Profile</NavLink>
      <NavLink
          to="/receipt"
          className={({ isActive }) =>
            isActive
              ? "text-blue-950 text-2xl font-semibold w-[980px]"
              : "hidden"
          }
        >Réçu</NavLink>
      <div className=" flex justify-between items-center gap-6 ">
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive
              ? ""
              :  ""
          }
        >
          <img src={setting} alt="" />
        </NavLink>
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive
              ? ""
              : ""
          }
        >
          <img src={user} alt="" />
        </NavLink>
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "w-5 h-5"
              : "w-5 h-5"
          }
        >
          <img src={chevron} alt="" />
        </NavLink>
        
      </div>

    </div>
  );
}
