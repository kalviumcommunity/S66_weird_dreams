/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const inputCls =
  "block w-full rounded-lg border border-line bg-white px-4 py-2.5 text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-violet-200";

const EMOTIONS = [
  "happy", "scared", "excited", "confused", "calm", "sad",
  "angry", "surprised", "frustrated", "nostalgic", "anxious",
];

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
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Dream Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Dream Title"
            onChange={handleChange}
            className={inputCls}
            required
          />
        </div>

        <div>
          <label className={labelCls}>Dream Story</label>
          <textarea
            name="description"
            value={formData.description}
            placeholder="Describe your dream..."
            onChange={handleChange}
            className={inputCls + " h-32"}
            required
          ></textarea>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-ink">Dream Type</span>
          <div className="flex flex-wrap gap-6">
            {["Lucid", "Nightmare", "Recurring"].map((f) => {
              const key = f.toLowerCase();
              return (
                <label key={f} className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData[key]}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-line text-accent focus:ring-violet-200"
                  />
                  {f}
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelCls}>Emotions</label>
          <select onChange={handleEmotionChange} className={inputCls} value="">
            <option value="">-- Choose an emotion --</option>
            {EMOTIONS.map((emotion) => (
              <option key={emotion} value={emotion}>
                {emotion}
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-2">
            {(formData.emotions || []).map((emotion) => (
              <span
                key={emotion}
                className="cursor-pointer rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent hover:bg-violet-200"
                onClick={() => removeEmotion(emotion)}
              >
                {emotion} ✕
              </span>
            ))}
            {(formData.emotions || []).length === 0 && (
              <span className="text-sm text-muted">No emotions selected</span>
            )}
          </div>
        </div>

        <div>
          <label className={labelCls}>Tags</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="newTag"
              placeholder="Enter a tag"
              value={formData.newTag || ""}
              onChange={handleChange}
              className={inputCls + " flex-1"}
            />
            <button
              type="button"
              onClick={addTag}
              className="rounded-lg bg-accent px-4 py-2.5 font-bold text-white hover:bg-violet-700"
            >
              +
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(formData.tags || []).map((tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-200"
                onClick={() => removeTag(tag)}
              >
                {tag} ✕
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 font-bold text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Dream"}
        </button>
      </form>
    </div>
  );
};

export default EditDreamForm;