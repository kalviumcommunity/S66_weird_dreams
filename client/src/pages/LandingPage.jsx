import { Link } from 'react-router-dom';
import background1 from '../assets/background1.png'
import Features from '../components/Features'
import Navbar from '../components/Navbar';

const LandingPage = () => {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white overflow-hidden ">
        <div className="absolute flex justify-center items-center opacity-30 ">
          <img
            src={background1}
            alt="Dreamy Background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <Navbar />
        <section className="relative flex flex-col items-center justify-center h-screen text-center px-6">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
            Weird Dreams ✨
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl text-purple-200 mt-4 opacity-90">
            Dive into the surreal world of dreams. Log your strangest, most
            ethereal thoughts and explore your subconscious mind.
          </p>
          <div>
            <Link to="/dreams" className="relative z-10">
              <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg">
                Explore Dreams
              </button>
            </Link>
          </div>
        </section>
        <Features />
      </div>
    );
    };

    

export default LandingPage;
