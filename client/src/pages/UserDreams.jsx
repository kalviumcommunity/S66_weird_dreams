/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DreamCard from "../components/DreamCard";
import ModalContent from "../components/ModalContent";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

const UserDreams = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams();
  const { token } = useAuth();
  const [analysisResults, setAnalysisResults] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchUserDreams = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${API_BASE_URL}/dream/get/${userId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setDreams(res.data.dreams || []);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to load dreams");
        setDreams([]);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchUserDreams();
  }, [userId, token]);

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
      const msg = error.response?.data?.error || "Failed to analyze dream.";
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
        <h1 className="mb-1 text-center text-3xl font-bold tracking-tight">Dream Journal</h1>
        <p className="mb-8 text-sm text-muted">Dreams in your private journal</p>

        {loading ? (
          <div className="flex items-center gap-3 text-muted">
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent"></span>
            <span>Loading dreams...</span>
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
              loadingId={loadingId}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <p className="text-muted">No dreams found.</p>
          </div>
        )}

        <ModalContent modalContent={modalContent} setModalContent={setModalContent} />
      </div>
    </div>
  );
};

export default UserDreams;