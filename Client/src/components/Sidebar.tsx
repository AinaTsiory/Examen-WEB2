import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import IconDashboard from "../assets/icones/Grid 2_48px.png";
import Iconprofil from "../assets/icones/Male User_50pxwhite.png";
import IconIncome from "../assets/icones/Bank_48px.png";
import IconExpense from "../assets/icones/Credit Card_50px.png";
import IconCategorie from "../assets/icones/Layers_50px.png";
import IconRecu from "../assets/icones/Download_48px.png";
import IconDeconnexion from "../assets/icones/Logout.png";

import Logo1 from "../assets/logo/rb LogoSpendtrack.png"; 
import Logo2 from "../assets/logo/rb logoSearch.png";     
import ChevronRight from "../assets/icones/chevron-droit.png";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  // gérer automatiquement selon la taille d’écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // exécuter une fois au montage
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { to: "/", icon: IconDashboard, label: "Dashboard" },
    { to: "/incomes", icon: IconIncome, label: "Incomes" },
    { to: "/expenses", icon: IconExpense, label: "Expenses" },
    { to: "/categories", icon: IconCategorie, label: "Categories" },
    { to: "/profil", icon: Iconprofil, label: "Profil" },
    { to: "/receipt", icon: IconRecu, label: "Réçu" },
    { to: "/deconnexion", icon: IconDeconnexion, label: "Déconnexion" },
  ];

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`
          fixed top-0 left-0 h-screen z-50
          bg-gradient-to-t from-black via-blue-900 to-blue-950
          shadow-[3px_0_6px_rgba(0,0,0,0.3)]
          transition-all duration-300
          ${open ? "w-52" : "w-16"}
        `}
      >
        {/* Logo en haut */}
        <div className="flex justify-center items-center p-3">
          <img
            src={open ? Logo1 : Logo2}
            alt="Logo"
            className={`transition-all duration-300 ${open ? "w-36" : "w-10"}`}
          />
                  {/* Chevron en bas */}
          <img
            src={ChevronRight}
            alt="Toggle Sidebar"
            onClick={() => setOpen(!open)}
            className={`w-6 h-6 cursor-pointer transition-transform duration-300
              ${open ? "rotate-90" : "rotate-0"}`}
          />
        </div>

        {/* Liens */}
        <div className="mt-6 flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md font-semibold transition-all duration-300
                 ${isActive
                   ? "bg-gradient-to-r from-blue-500 to-blue-800 text-gray-200"
                   : "text-white hover:from-blue-500 hover:to-blue-800 hover:text-white"}`
              }
            >
              <img src={link.icon} alt={link.label} className="w-7 h-7 shrink-0" />
              {open && <span className="ml-2">{link.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Contenu principal avec marge pour le sidebar */}
      <main
        className={`transition-all duration-300 ${open ? "ml-52" : "ml-16"} p-4`}
      >
        {/* ici tu mets ton <Incomes /> ou autres pages */}
      </main>
    </>
  );
}
