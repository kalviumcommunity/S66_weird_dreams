import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditDream = () => {
  const { dreamId } = useParams();
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEmotionChange = (e) => {
    const selected = e.target.value;
    if (!formData.emotions.includes(selected)) {
      setFormData((prev) => ({
        ...prev,
        emotions: [...prev.emotions, selected],
      }));
    }
  };

  const addTag = () => {
    if (
      formData.newTag.trim() !== "" &&
      !formData.tags.includes(formData.newTag.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, formData.newTag.trim()],
        newTag: "",
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/dream/update-dream/${dreamId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update dream");
      setShowSuccess(true);
      alert("Dream Updated successfullyy")
      navigate(`/dreams/${formData.userId}`);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating dream:", error);
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Dream Title"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              placeholder="Describe your dream"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
            <div className="flex gap-4">
              <label className="text-purple-300">Dream Type</label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="lucid"
                  checked={formData.lucid}
                  onChange={handleChange}
                />
                Lucid
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="nightmare"
                  checked={formData.nightmare}
                  onChange={handleChange}
                />
                Nightmare
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="recurring"
                  checked={formData.recurring}
                  onChange={handleChange}
                />
                Recurring
              </label>
            </div>
            <label className="text-purple-300">Select Emotions</label>
            <select
              onChange={handleEmotionChange}
              className="w-full mt-2 p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Choose an Emotion --</option>
              {[
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
              ].map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>
            <div>
              <label className="text-purple-300">Tags</label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  name="newTag"
                  placeholder="Enter a tag"
                  value={formData.newTag}
                  onChange={handleChange}
                  className="flex-1 p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold transition-transform transform hover:scale-105"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap mt-2 space-x-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ✖
                  </span>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105"
            >
              Update Dream
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditDream;
