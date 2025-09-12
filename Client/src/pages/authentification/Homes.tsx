import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_projet from "../../assets/images/logo_spend_track.png";
import video_projet from "../../assets/video/6282314-hd_1920_1080_30fps.mp4";
import budget from "../../assets/images/budget.jpeg";
import resultat from "../../assets/images/resultat.jpeg";
import client from "../../assets/images/client.jpeg";
import logo_facebook from "../../assets/images/Logo Facebook sur fond bleu.png";
import logo_insta from "../../assets/images/logo_insta.png";


const Home = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playstart = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>

      <div className="scoll-smoth overflow-scroll ">
        <header className="bg-gray-50 shadow-md px-10 flex justify-between items-center fixed w-full top-0 z-50">
          <div className="flex items-center gap-3">
            <img
              src={logo_projet}
              alt="Logo Spend Track"
              className="w-[80px] h-[80px] rounded-full object-cover"
            />

          </div>
          <div className="flex gap-3 w-3/6 justify-between ">
            <nav className="mr-40">
              <ul className="flex justify-between items-center gap-10">
                <li><a href="#Accueil" className="text-blue-900 text-xl font-semibold relative px-4 py-2 font-semibold 
         before:absolute before:left-0 before:top-0 before:h-[2px] before:w-0 before:bg-green-500 before:transition-all before:duration-300
         after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300
         hover:before:w-full hover:after:w-full hover:text-green-500">Acceuil</a></li>
                <li><a href="#apropos" className="text-blue-900 text-xl font-semibold relative px-4 py-2 font-semibold 
         before:absolute before:left-0 before:top-0 before:h-[2px] before:w-0 before:bg-green-500 before:transition-all before:duration-300
         after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300
         hover:before:w-full hover:after:w-full hover:text-green-500">Apropos</a></li>
                <li><a href="#contact" className="text-blue-900 text-xl font-semibold relative px-4 py-2 font-semibold 
         before:absolute before:left-0 before:top-0 before:h-[2px] before:w-0 before:bg-green-500 before:transition-all before:duration-300
         after:absolute after:right-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-500 after:transition-all after:duration-300
         hover:before:w-full hover:after:w-full hover:text-green-500">contact</a></li>
              </ul>
            </nav>
            <div className="flex gap-5">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-gradient-to-r from-black to-blue-700 text-white rounded-lg hover:from-gray-800 hover:to-blue-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Signup
              </button>
            </div>
          </div>
        </header>

        <main className="pt-24 container mx-auto px-4">

          <section className="flex flex-col md:flex-row items-center gap-6 py-8">
            <div className="flex justify-center flex-col items-center flex-1">
              <h1 className="text-[50px] font-bold text-blue-900 mb-2 text-center">
                Bienvenue sur Spend Track
              </h1>
              <p className="text-lg text-gray-600 mb-4 text-center">
                Nos clients nous font confiance pour simplifier la gestion de leurs finances quotidiennes.
                Grâce à Spend Track, ils peuvent suivre leurs dépenses facilement, gagner du temps et prendre
                de meilleures décisions financières chaque jour.
              </p>
              <div className="flex gap-5">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-gradient-to-r from-black to-blue-700 text-white rounded-lg hover:from-gray-800 hover:to-blue-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Signup
                </button>
              </div>
            </div>

            <div className="relative w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg" id="Accueil">
              <video autoPlay loop muted playsInline
                ref={videoRef}
                className="w-full h-auto rounded-lg"
              >
                <source src={video_projet} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
              </video>


            </div>
          </section>


          <section className="py-12 bg-gray-100" id="apropos">
            <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-10 px-4">

              <div className="w-[300px] h-[420px] hover:w-[320px] hover:h-[450px] bg-white rounded-xl  transition-all duration-300 p-6 bg-gradient-to-br from-indigo-50 to-indigo-100">
                <img src={client} alt="Clients" className="w-full h-48 object-cover rounded-xl mb-4 " />
                <h3 className="text-xl font-semibold mb-2 text-center">Satisfaction client</h3>
                <p className="text-gray-600 text-center">
                  Nos clients sont au cœur de notre mission. Spend Track leur permet de gérer leurs finances en toute confiance et de suivre chaque dépense facilement.
                </p>
              </div>

              <div className="w-[320px] h-[450px] bg-white rounded-xl shadow-lg hover:shadow-4xl transition-all duration-300 p-6 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100">
                <img src={resultat} alt="Résultats" className="w-full h-48 object-cover rounded-xl mb-4 shadow-lg" />
                <h3 className="text-xl font-semibold mb-2 text-center">Résultats clairs</h3>
                <p className="text-gray-600 text-center">
                  Visualisez vos résultats financiers rapidement grâce à nos graphiques et rapports détaillés pour prendre les meilleures décisions.
                </p>
              </div>


              <div className="w-[300px] h-[420px]  hover:w-[320px] hover:h-[450px] bg-white rounded-xl shadow-3xl hover:shadow-4xl transition-all duration-300 p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
                <img src={budget} alt="Budget" className="w-full h-48 object-cover rounded-xl mb-4 shadow-lg" />
                <h3 className="text-xl font-semibold mb-2 text-center">Gestion du budget</h3>
                <p className="text-gray-600 text-center">
                  Planifiez et suivez votre budget facilement. Spend Track vous aide à rester organisé et à éviter les dépenses inutiles.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-800 text-gray-200 py-12 mt-12" id="contact">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

            <div className="flex items-center gap-3">
              <img
                src={logo_projet}
                alt="Logo Spend Track"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-semibold text-white text-xl">Spend Track</span>
            </div>

            <p className="text-base text-gray-300">&copy; 2025 Spend Track. Tous droits réservés.</p>

            <div className="flex gap-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={logo_facebook} alt="Facebook" className="w-10 h-10 hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={logo_insta} alt="Instagram" className="w-10 h-10 hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </footer>
      </div>

    </>
  );
};

export default Home;
