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
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-10 sm:px-6">
        {showSuccess && (
          <div className="fixed top-20 right-4 z-50 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
            Dream updated successfully!
          </div>
        )}
        {error && (
          <div className="mb-4 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <div className="w-full rounded-2xl border border-line bg-white p-8 shadow-sm">
          <h2 className="mb-1 text-center text-2xl font-bold tracking-tight">Edit Dream</h2>
          <p className="mb-5 text-center text-sm text-muted">Update the details of this dream</p>
          {loading ? (
            <p className="py-8 text-center text-muted">Loading...</p>
          ) : (
            <EditDreamForm formData={formData} setFormData={setFormData} setShowSuccess={setShowSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDream;