/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import AddDreamForm from "../components/AddDreamForm";
import DreamCard from "../components/DreamCard";
import Navbar from "../components/Navbar";

const DreamForm = ({analyzeDream, handleDelete, loadingId}) => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    userId: "6798b05ffa793a218f732d6f",
    title: "",
    description: "",
    emotions: [],
    lucid: false,
    nightmare: false,
    recurring: false,
    tags: [],
    newTag: "",
  });
  const emotions = [
    "happy",
    "scared",
    "excited",
    "confused",
    "calm",
    "sad",
    "angry",
    "surprised",
    "frustrated",
    "nostalgic",
    "anxious",
  ];

  const fetchDreams = () => {
    setLoading(true);
    fetch(`http://localhost:8080/dream/get/${formData.userId}`)
      .then((res) => res.json())
      .then((res) => {
        setDreams(res.dreams);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDreams();
  },[]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
      <Navbar />

      <div className="relative flex flex-col items-center justify-center p-8">
        {showSuccess && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out">
            Dream added successfully!
          </div>
        )}

        <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-purple-400/50 mb-10">
          <h2 className="text-3xl font-bold text-purple-300 text-center">
            Add a Dream
          </h2>
          <AddDreamForm
            formData={formData}
            setFormData={setFormData}
            emotions={emotions}
            fetchDreams={fetchDreams}
            setShowSuccess={setShowSuccess}
          />
        </div>

        <div className="relative z-10 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-purple-300 text-center">
            Your Dreams
          </h2>
          {loading ? (
            <p className="text-gray-300 text-center mt-4">Loading...</p>
          ) : dreams.length > 0 ? (
            dreams.map((dream) => (
              <DreamCard
                key={dream._id}
                dream={dream}
                analyzeDream={analyzeDream}
                handleDelete={handleDelete}
                loadingId={loadingId}
              />
            ))
          ) : (
            <p className="text-lg text-gray-300 text-center mt-4">
              No dreams added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DreamForm;
