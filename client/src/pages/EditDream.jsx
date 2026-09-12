import { useState, useEffect } from "react";
import EditDreamForm from "../components/EditDreamForm";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

const EditDream = () => {
  const { dreamId } = useParams();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    emotions: [],
    lucid: false,
    nightmare: false,
    recurring: false,
    tags: [],
    newTag: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchDream = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/dream/get-dream/${dreamId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const dream = res.data.dream;
        if (dream) {
          setFormData({
            title: dream.title || "",
            description: dream.description || "",
            date: dream.date ? new Date(dream.date).toISOString().slice(0, 10) : "",
            emotions: dream.emotions || [],
            lucid: !!dream.lucid,
            nightmare: !!dream.nightmare,
            recurring: !!dream.recurring,
            tags: dream.tags || [],
            newTag: "",
          });
        }
      } catch (err) {
        console.error("Error fetching dream:", err);
        setError(err.response?.data?.error || "Failed to load dream");
      } finally {
        setLoading(false);
      }
    };
    if (dreamId) fetchDream();
  }, [dreamId, token]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 opacity-30 bg-[url('../assets/background1.png')] bg-cover bg-center"></div>
        {showSuccess && (
          <div className="fixed top-5 right-5 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out z-50">
            Dream updated successfully!
          </div>
        )}
        {error && (
          <div className="relative z-10 bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg mb-4">
            {error}
          </div>
        )}
        <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-purple-400/50">
          <h2 className="text-3xl font-bold text-purple-300 text-center">
            Edit Dream
          </h2>
          {loading ? (
            <p className="text-center mt-4">Loading...</p>
          ) : (
            <EditDreamForm
              formData={formData}
              setFormData={setFormData}
              setShowSuccess={setShowSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDream;
