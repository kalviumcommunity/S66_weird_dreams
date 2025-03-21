import FeatureCard from './FeatureCard';
import secure from "../assets/secure.webp";
import entry from "../assets/entry.webp";
import tags from "../assets/tags.webp";
import futuristic from "../assets/futuristic.webp";
import ai from "../assets/ai.webp";
import share from "../assets/share.webp";

const Features = () => {
    return (
        <div>
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
}

export default Features
