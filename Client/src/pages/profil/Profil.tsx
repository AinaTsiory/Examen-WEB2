import { useEffect, useState } from "react";
import bg from "../../assets/images/bgbg.jpg"
import profile from "../../assets/images/profil.jpg"
import camera from "../../assets/icones/Camera_48px.png"

interface Utilisateur {
  id_utilisateur: number;
  nom: string;
  prenom: string;
  email: string;
  date_creation: string
}

export default function Profil() {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/utilisateurs")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className=" absolute left-[255px] top-20 w-[1215px] p-2.5">
      <div className=" w-full bg-amber-500 h-52 rounded-2xl  overflow-hidden relative">
        <img 
            src={bg}
            alt=""
            className="w-[100%]"
        />
      </div>
      <div className="w-[180px] h-[180px] rounded-[50%] border-2 border-solid border-white absolute top-38 left-15 overflow-hidden">
          <img 
              src={profile} 
              alt="" 
              className="w-full h-[100%] object-cover "
          />      
      </div>
      <div className="w-[50px] h-[50px] rounded-[50%] bg-gray-200 flex justify-center items-center absolute left-50 bottom-40">
        <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={(e) => console.log(e.target.files)}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
      >
        <img src={camera} className="w-7 h-7" alt="" />
      </label>
      </div>
      <ul className="absolute left-65 ">
        {users.map(user => (
          <li key={user.id_utilisateur} className="p-2 ">
            <h3 className="font-semibold text-2xl text-black">{user.prenom} <span className="uppercase">{user.nom}</span></h3>
            <p className="text-black ">Identifien : {user.id_utilisateur}</p>
          </li>
        ))}
      </ul>

      <div className="w-full border border-solid border-black p-5 mt-30 rounded">
          <ul className=" ">
        {users.map(user => (
          <li key={user.id_utilisateur} className="p-2 ">
            <h3 className=" text-black">email : {user.email} </h3>
            <span className="">date de creation :{user.date_creation}</span>
            <p className="text-black ">Identifien : {user.id_utilisateur}</p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
