/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import axios from "axios";
import DreamCard from "../components/DreamCard";
import ModalContent from "../components/ModalContent";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

const Dreams = () => {
  const { token } = useAuth();
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analysisResults, setAnalysisResults] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const fetchDreams = async () => {
    try {
      setLoading(true);
      setError("");
      // Private journal — always the logged-in user's own dreams
      const res = await axios.get(`${API_BASE_URL}/dream/my-dreams`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setDreams(res.data.dreams || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to load dreams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDreams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const analyzeDream = async (dreamId, description) => {
    setLoadingId(dreamId);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/ai/analyze-dream`,
        { dream: description },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setModalContent({ dreamId, analysis: response.data.analysis });
      setAnalysisResults((prev) => ({ ...prev, [dreamId]: response.data.analysis }));
    } catch (error) {
      console.error("Error analyzing dream:", error);
      const msg = error.response?.data?.error || "Failed to analyze dream. (Login required + Gemini key required)";
      setAnalysisResults((prev) => ({ ...prev, [dreamId]: msg }));
      alert(msg);
    }
    setLoadingId(null);
  };

  const handleDelete = async (dreamId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this dream?"
    );
    if (confirmation) {
      try {
        await axios.delete(`${API_BASE_URL}/dream/delete/${dreamId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setDreams(dreams.filter((data) => data._id !== dreamId));
        alert("Dream deleted successfully!");
      } catch (error) {
        console.error("Error deleting dream:", error);
        alert(error.response?.data?.error || "Failed to delete dream");
      }
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-10 sm:px-6">
        <h1 className="mb-1 text-center text-3xl font-bold tracking-tight">🌙 Dream Journal</h1>
        <p className="mb-8 text-sm text-muted">Only you can see these dreams</p>

        {loading ? (
          <div className="flex items-center gap-3 text-muted">
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent"></span>
            <span>Loading your dreams...</span>
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : dreams.length > 0 ? (
          dreams.map((dream) => (
            <DreamCard
              key={dream._id}
              dream={dream}
              analyzeDream={analyzeDream}
              handleDelete={handleDelete}
              onDelete={handleDelete}
              loadingId={loadingId}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <p className="text-muted">No dreams yet. Add your first dream to begin. ✨</p>
          </div>
        )}

        <ModalContent modalContent={modalContent} setModalContent={setModalContent} />
      </div>
    </div>
  );
};

export default Dreams;