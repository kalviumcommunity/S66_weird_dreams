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
  const { userId } = useParams();
  const { token } = useAuth();
  const [analysisResults, setAnalysisResults] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const fetchUserDreams = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/dream/get/${userId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setDreams(res.data.dreams || []);
      } catch (err) {
        console.log(err);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
      <Navbar />
      <div className="relative flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 opacity-30 bg-[url('../assets/background1.png')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl w-full">
          {loading ? (
            <p className="text-lg text-gray-300 text-center">Loading dreams...</p>
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
            <p className="text-lg text-gray-300 text-center">No dreams found.</p>
          )}
          <ModalContent
            modalContent={modalContent}
            setModalContent={setModalContent}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDreams;
