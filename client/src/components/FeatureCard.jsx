/* eslint-disable react/prop-types */

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

export default FeatureCard
