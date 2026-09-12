/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import AddDreamForm from "../components/AddDreamForm";
import DreamCard from "../components/DreamCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AddDream = () => {
  const { user, token } = useAuth();
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
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

  const fetchDreams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/dream/my-dreams`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setDreams(response.data.dreams || []);
      setError('');
    } catch (err) {
      console.error("Error fetching dreams:", err);
      setError(err.response?.data?.error || 'Failed to load dreams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user) {
      fetchDreams();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user]);

  const handleDelete = async (dreamId) => {
    if (!window.confirm("Are you sure you want to delete this dream?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/dream/delete/${dreamId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchDreams();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Error deleting dream:", err);
      setError('Failed to delete dream');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
      <Navbar />

      <div className="relative flex flex-col items-center justify-center p-8">
        {showSuccess && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out">
            Dream operation successful!
          </div>
        )}

        {error && (
          <div className="fixed top-5 right-5 bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg">
            {error}
          </div>
        )}

        <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-purple-400/50 mb-10">
          <h2 className="text-3xl font-bold text-purple-300 text-center">
            Add a Dream ✨
          </h2>
          <AddDreamForm
            formData={formData}
            setFormData={setFormData}
            emotions={emotions}
            fetchDreams={fetchDreams}
            setShowSuccess={setShowSuccess}
            token={token}
          />
        </div>

        <div className="relative z-10 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-purple-300 text-center">
            Your Dreams ({dreams.length})
          </h2>
          {loading ? (
            <div className="text-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-gray-300 mt-2">Loading your dreams...</p>
            </div>
          ) : dreams.length > 0 ? (
            dreams.map((dream) => (
              <DreamCard
                key={dream._id}
                dream={dream}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-lg text-gray-300 text-center mt-4">
              No dreams added yet. Start by adding your first dream! 🌙
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDream;
