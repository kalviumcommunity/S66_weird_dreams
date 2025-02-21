/* eslint-disable react/prop-types */
import background1 from '../assets/background1.png'
// import background2 from '../assets/background2.webp'
import secure from '../assets/secure.webp'
import entry from '../assets/entry.webp'
import tags from '../assets/tags.webp'
import futuristic from '../assets/futuristic.webp'
import ai from '../assets/ai.webp'
import share from '../assets/share.webp'
import {Link} from 'react-router-dom'

const LandingPage = () => {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute  flex justify-center items-center opacity-30">
          <img
            src={background1}
            alt="Dreamy Background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        <section className="relative flex flex-col items-center justify-center h-screen text-center px-6">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
            Weird Dreams ✨
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl text-purple-200 mt-4 opacity-90">
            Dive into the surreal world of dreams. Log your strangest, most
            ethereal thoughts and explore your subconscious mind.
          </p>
          <Link to="/dreams/:userId" className="relative z-10">
            <button className="mt-8 px-6 py-2 mx-2 text-lg font-semibold border-2 rounded-lg">
              Explore Dreams
            </button>
          </Link>
        </section>

        <section className="py-16 bg-gradient-to-b from-[#773092] via-[#5A59C1] to-[#5D3B88] relative">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 text-white drop-shadow-lg">
              Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard
                image={secure}
                title="Secure Login 🔐"
                description="Register and log in securely to access your private dream journal."
              />
              <FeatureCard
                image={entry}
                title="Dream Entries 📝"
                description="Add, update, and delete dream entries with ease."
              />
              <FeatureCard
                image={tags}
                title="Tag Your Dreams 🌙"
                description="Organize your dreams using AI-powered categorization."
              />
              <FeatureCard
                image={futuristic}
                title="Futuristic UI 🚀"
                description="A sleek, immersive interface with cosmic aesthetics."
              />
              <FeatureCard
                image={ai}
                title="AI Analysis 🤖"
                description="Analyze dream patterns and uncover hidden meanings."
              />
              <FeatureCard
                image={share}
                title="Share and Post 🌍"
                description="Available anywhere, anytime with a global cloud server."
              />
            </div>
          </div>
        </section>
      </div>
    );
    };

    const FeatureCard = ({ image, title, description }) => (
    <div className="bg-gradient-to-br from-[#5A59C1] to-[#5D3B88] p-6 rounded-xl shadow-xl hover:scale-105 transition duration-300 shadow-[#C7B3F7]/50 border border-[#C7B3F7]/50 relative">
        <div className="absolute -top-2 -right-2 bg-[#F7B3F7] w-8 h-8 rounded-full"></div>
        <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover rounded-md mb-4 shadow-lg border border-[#C7B3F7]/50"
        />
        <h3 className="text-2xl font-semibold mb-2 text-[#E3D1FF] drop-shadow-md">
        {title}
        </h3>
        <p className="text-[#D8C2FF] opacity-90">{description}</p>
    </div>
);

export default LandingPage;
