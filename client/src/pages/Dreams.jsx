import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const Dreams = () => {
    const [dreams, setDream]=useState([])
    const {userId}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        fetch(`http://localhost:8080/dream/get/${userId}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            setDream(res.dreams)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[userId])

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return (
            date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            }) +
            " " +
            date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
            })
        );
    };

    const handleDelete = async (dreamId) => {
        const confirmation = window.confirm(
            "Are you sure you want to delete this dream?"
        );
        if (confirmation) {
            try {
            await axios.delete(`http://localhost:8080/dream/delete/${dreamId}`);
            setDream(dreams.filter((data) => data._id !== dreamId));
            alert("Dream deleted successfully!");
            } catch (error) {
            console.error("Error deleting dream:", error);
            }
        }
    };


    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white flex items-center justify-center p-8">
            <div className="absolute inset-0 opacity-30 bg-[url('../assets/background1.png')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="relative z-10 max-w-2xl w-full">
            {dreams.length > 0 ? (
                dreams.map((dream) => (
                <div
                    key={dream._id}
                    className="bg-white/10 backdrop-blur-lg shadow-xl p-10 rounded-2xl border border-purple-400/50 transition-transform transform hover:scale-105 mb-6"
                >
                    <h3 className="text-3xl font-bold text-purple-300 drop-shadow-md">
                    {dream.title}
                    </h3>
                    <p className="text-lg text-gray-300 mt-4 max-h-40 overflow-auto break-words">
                    {dream.description}
                    </p>
                    <div className="mt-6 space-y-4">
                    <span className="block text-md text-gray-400">
                        {formatDateTime(dream.date)}
                    </span>
                    <div>
                        <strong>💭 Emotions:</strong>{" "}
                        <span className="text-purple-300">
                        {dream.emotions.join(", ")}
                        </span>
                    </div>
                    <div>
                        <strong>🌙 Lucid:</strong>{" "}
                        <span className="text-green-400">
                        {dream.lucid ? "Yes" : "No"}
                        </span>
                    </div>
                    <div>
                        <strong>👻 Nightmare:</strong>{" "}
                        <span className="text-red-400">
                        {dream.nightmare ? "Yes" : "No"}
                        </span>
                    </div>
                    <div>
                        <strong>🔁 Recurring:</strong>{" "}
                        <span className="text-yellow-300">
                        {dream.recurring ? "Yes" : "No"}
                        </span>
                    </div>
                    <div>
                        <strong>🏷️ Tags:</strong>{" "}
                        <span className="text-blue-300">
                        {dream.tags.join(", ")}
                        </span>
                    </div>
                    <div className="mt-6 flex justify-between">
                        <button
                        onClick={() => navigate(`/edit-dream/${dream._id}`)}
                        className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-500 transition duration-200"
                        >
                        ✏️ Edit
                        </button>
                        <button
                        onClick={() => handleDelete(`${dream._id}`)}
                        className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition duration-200"
                        >
                        🗑️ Delete
                        </button>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-lg text-gray-300">No dreams found.</p>
            )}
            </div>
        </div>
    );

};

export default Dreams;
