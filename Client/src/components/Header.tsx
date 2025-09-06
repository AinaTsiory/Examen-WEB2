import { NavLink } from "react-router-dom";
import search from "../assets/icones/Search_26px.png"
import calendrier from "../assets/icones/Calendar_2px.png"
import chevron from "../assets/icones/Chevron Down_26px.png"

export default function Header() {
  return (
    <div className=" bg-white w-5/6 absolute right-0 top-0 p-4 flex justify-between items-center pr-5 ">
      <form className="bg-amber-100 w-100 flex justify-between border border-solid border-gray-300 overflow-hidden  rounded-tr rounded-br h-9">
        <input type="text" className="bg-white w-95 pl-3 border-none focus:outline-none focus:border-none text-gray-700" placeholder="Search..." />
        <button className="bg-blue-500 p-1 rounded">
          <img src={search}
            className=""
            alt="" />
        </button>
      </form>
      <div className=" flex justify-between items-center gap-8">
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            isActive
              ? "w-10 h-10 rounded-[50%] bg-linear-to-t from-red-500 to-red-300 text-red-100 text-2xl font-semibold flex justify-center items-center"
              : "w-10 h-10 rounded-[50%] bg-linear-to-t from-red-500 to-red-300 text-red-100 text-2xl font-semibold flex justify-center items-center "
          }
        >
          S
        </NavLink>
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "w-10 h-10"
              : "w-10 h-10"
          }
        >
          <img src={calendrier} alt="" />
        </NavLink>
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive
              ? "w-10 h-10 flex justify-center"
              : "w-10 h-10 flex items-center"
          }
        >
          <img src={chevron} alt="" />
        </NavLink>
        
      </div>

    </div>
  );
}
