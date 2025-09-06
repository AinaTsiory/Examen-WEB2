import { NavLink } from "react-router-dom";
import search from "../assets/icones/Search_26px.png"

export default function Header() {
  return (
    <div className=" bg-white w-5/6 absolute right-0 top-0 border-b border-black p-4">
      <form className="bg-amber-100 w-100 flex justify-between border border-solid border-gray-300 overflow-hidden  rounded-tr rounded-br">
        <input type="text" className="bg-white w-95 pl-3 border-none focus:outline-none focus:border-none text-gray-700" placeholder="Search..." />
        <button className="bg-blue-500 p-1 rounded">
          <img src={search}
          className=""
          alt="" />
        </button>
      </form>
      <div>
        
      </div>
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
    </div>
  );
}
