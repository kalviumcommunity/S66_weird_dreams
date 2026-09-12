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
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />

      {showSuccess && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
          Dream operation successful!
        </div>
      )}

      {error && (
        <div className="fixed top-20 right-4 z-50 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-lg">
          {error}
        </div>
      )}

      <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-8 shadow-sm">
          <h2 className="mb-1 text-center text-2xl font-bold tracking-tight">Add a Dream ✨</h2>
          <p className="mb-5 text-center text-sm text-muted">Capture it before it fades</p>
          <AddDreamForm
            formData={formData}
            setFormData={setFormData}
            emotions={emotions}
            fetchDreams={fetchDreams}
            setShowSuccess={setShowSuccess}
            token={token}
          />
        </div>

        <div className="w-full">
          <h3 className="mb-4 text-center text-xl font-bold tracking-tight">
            Your Dreams ({dreams.length})
          </h3>
          {loading ? (
            <div className="flex items-center justify-center gap-3 text-muted">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent"></span>
              <span>Loading your dreams...</span>
            </div>
          ) : dreams.length > 0 ? (
            dreams.map((dream) => (
              <DreamCard key={dream._id} dream={dream} onDelete={handleDelete} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
              <p className="text-muted">No dreams added yet. Start with the form above. 🌙</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDream;