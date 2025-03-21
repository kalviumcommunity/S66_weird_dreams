/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DreamCard from "../components/DreamCard";
import ModalContent from "../components/modalContent";

const UserDreams = () => {
  const [dreams, setDream] = useState([]);
  const { userId } = useParams();
  const [setAnalysisResults] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/dream/get/${userId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setDream(res.dreams);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const analyzeDream = async (dreamId, description) => {
    setLoadingId(dreamId);
    try {
      const response = await fetch("http://localhost:8080/ai/analyze-dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream: description }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setModalContent({ dreamId, analysis: data.analysis });
      console.log(data);
      alert("Dream analyzed");
    } catch (error) {
      console.error("Error analyzing dream:", error);
      setAnalysisResults((prev) => ({
        ...prev,
        [dreamId]: "Failed to analyze dream.",
      }));
    }
    setLoadingId(null);
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
            <DreamCard
              dream={dream}
              analyzeDream={analyzeDream}
              handleDelete={handleDelete}
              loadingId={loadingId}
            />
          ))
        ) : (
          <p className="text-lg text-gray-300">No dreams found.</p>
        )}
        <ModalContent
          modalContent={modalContent}
          setModalContent={setModalContent}
        />
      </div>
    </div>
  );
};

export default UserDreams;
