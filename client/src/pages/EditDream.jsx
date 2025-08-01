import { useState, useEffect } from "react";
import EditDreamForm from "../components/EditDreamForm";
import { useParams } from "react-router-dom";

const EditDream = () => {
  const { dreamId } = useParams();
  const [formData, setFormData] = useState({
    userId: "6798b05ffa793a218f732d6f",
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
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/dream/get/${dreamId}`)
      .then((res) => res.json())
      .then((data) => {
        const dream = data.dreams.find((d) => d._id === dreamId);
        if (dream) {
          setFormData({ ...dream, newTag: "" });
        }
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching dream:", err));
  }, [dreamId]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 opacity-30 bg-[url('../assets/background1.png')] bg-cover bg-center"></div>
      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out">
          Dream updated successfully!
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
  );
};

export default EditDream;
