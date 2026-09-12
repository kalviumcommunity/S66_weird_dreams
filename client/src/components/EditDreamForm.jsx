/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

const EditDreamForm = ({ formData, setFormData, setShowSuccess }) => {
  const { dreamId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEmotionChange = (e) => {
    const selected = e.target.value;
    if (!selected) return;
    if (!(formData.emotions || []).includes(selected)) {
      setFormData((prev) => ({
        ...prev,
        emotions: [...(prev.emotions || []), selected],
      }));
    }
  };

  const removeEmotion = (emotion) => {
    setFormData((prev) => ({
      ...prev,
      emotions: (prev.emotions || []).filter((em) => em !== emotion),
    }));
  };

  const addTag = () => {
    const cleaned = (formData.newTag || "").trim().replace(/^@+/, "");
    if (
      cleaned !== "" &&
      !(formData.tags || []).includes(cleaned) &&
      !(formData.tags || []).includes(`@${cleaned}`)
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), cleaned],
        newTag: "",
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const { newTag, ...payload } = formData;
      const response = await axios.put(
        `${API_BASE_URL}/dream/update-dream/${dreamId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (!response.data?.dream) throw new Error("Failed to update dream");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      navigate(`/dreams`);
    } catch (error) {
      console.error("Error updating dream:", error);
      setError(error.response?.data?.error || error.message || "Failed to update dream");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div>
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
          <label className="text-purple-300">Selected Emotions</label>
          <div className="flex flex-wrap mt-2 gap-2">
            {(formData.emotions || []).map((emotion) => (
              <span
                key={emotion}
                className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-purple-600"
                onClick={() => removeEmotion(emotion)}
              >
                {emotion} ✖
              </span>
            ))}
            {(formData.emotions || []).length === 0 && (
              <span className="text-gray-400 text-sm">No emotions selected</span>
            )}
          </div>
        </div>
        <div>
          <label className="text-purple-300">Tags</label>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              name="newTag"
              placeholder="Enter a tag"
              value={formData.newTag || ""}
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
          <div className="flex flex-wrap mt-2 gap-2">
            {(formData.tags || []).map((tag) => (
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
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105"
        >
          {saving ? "Updating..." : "Update Dream"}
        </button>
      </form>
    </div>
  );
};

export default EditDreamForm;
