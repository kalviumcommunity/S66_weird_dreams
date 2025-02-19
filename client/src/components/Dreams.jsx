const Dreams = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white flex items-center justify-center p-8">
        {/* Background Overlay */}
        <div className="absolute inset-0 opacity-30 bg-[url('../assets/background1.png')] bg-cover bg-center mix-blend-overlay"></div>

        {/* Enlarged Dream Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-lg shadow-xl p-10 rounded-2xl border border-purple-400/50 transition-transform transform hover:scale-105 max-w-2xl w-full">
            <h3 className="text-3xl font-bold text-purple-300 drop-shadow-md">
            Floating City Above the Clouds
            </h3>
            <p className="text-lg text-gray-300 mt-4">
            I found myself walking on bridges made of light, suspended between the
            sky…
            </p>
            <div className="mt-6 space-y-4">
            <span className="block text-md text-gray-400">
                📅 Date: 19-02-2025
            </span>
            <div>
                <strong>💭 Emotions:</strong>{" "}
                <span className="text-purple-300">Excited, Calm</span>
            </div>
            <div>
                <strong>🌙 Lucid:</strong>{" "}
                <span className="text-green-400">Yes</span>
            </div>
            <div>
                <strong>👻 Nightmare:</strong>{" "}
                <span className="text-red-400">No</span>
            </div>
            <div>
                <strong>🔁 Recurring:</strong>{" "}
                <span className="text-yellow-300">Yes</span>
            </div>
            <div>
                <strong>🏷️ Tags:</strong>{" "}
                <span className="text-blue-300">Flying, City, Clouds</span>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Dreams;
