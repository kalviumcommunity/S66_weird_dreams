/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const inputCls =
  "block w-full rounded-lg border border-line bg-white px-4 py-2.5 text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-violet-200 disabled:opacity-50";

const AddDreamForm = ({ formData, setFormData, emotions, fetchDreams, setShowSuccess, token }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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
    if (!formData.emotions.includes(selected)) {
      setFormData((prev) => ({
        ...prev,
        emotions: [...prev.emotions, selected],
      }));
    }
  };

  const removeEmotion = (emotion) => {
    setFormData((prev) => ({
      ...prev,
      emotions: prev.emotions.filter((e) => e !== emotion),
    }));
  };

  const addTag = () => {
    const cleaned = (formData.newTag || "").trim().replace(/^@+/, "");
    if (cleaned !== "" && !formData.tags.includes(`@${cleaned}`) && !formData.tags.includes(cleaned)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, `@${cleaned}`],
        newTag: "",
      }));
    }
  };

  const removeTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setSubmitError('Title and description are required');
      return;
    }
    if (formData.description.trim().length < 10) {
      setSubmitError('Description must be at least 10 characters');
      return;
    }
    if (formData.emotions.length === 0) {
      setSubmitError('Please select at least one emotion');
      return;
    }

    setIsSubmitting(true);

    try {
      const { newTag, ...dreamData } = formData;
      const response = await axios.post(`${API_BASE_URL}/dream/create`, dreamData, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      console.log("API Response:", response.data);

      setFormData({
        title: "",
        description: "",
        emotions: [],
        tags: [],
        lucid: false,
        nightmare: false,
        recurring: false,
        newTag: "",
      });

      await fetchDreams();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error.response?.data?.error || error.message || "Failed to save dream");
    } finally {
      setIsSubmitting(false);
    }
  };

return (
    <div>
      {submitError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <span className="text-sm text-red-600">{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelCls}>Dream Title</label>
          <input
            type="text"
            name="title"
            placeholder="Dream Title"
            value={formData.title}
            onChange={handleChange}
            className={inputCls}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className={labelCls}>Dream Story</label>
          <textarea
            name="description"
            placeholder="Describe your dream..."
            value={formData.description}
            onChange={handleChange}
            className={inputCls + " h-32"}
            required
            disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                  {f}
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className={labelCls}>Emotions</label>
          <select onChange={handleEmotionChange} className={inputCls} value="" disabled={isSubmitting}>
            <option value="">-- Choose an emotion --</option>
            {emotions.map((emotion) => (
              <option key={emotion} value={emotion}>
                {emotion}
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.emotions.map((emotion) => (
              <span
                key={emotion}
                className="cursor-pointer rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent hover:bg-violet-200"
                onClick={() => !isSubmitting && removeEmotion(emotion)}
              >
                {emotion} ✕
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls}>Tags</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="newTag"
              placeholder="Enter a tag"
              value={formData.newTag}
              onChange={handleChange}
              className={inputCls + " flex-1"}
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={addTag}
              className="rounded-lg bg-accent px-4 py-2.5 font-bold text-white hover:bg-violet-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              +
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-200"
                onClick={() => !isSubmitting && removeTag(tag)}
              >
                {tag} ✕
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 font-bold text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
              Saving Dream...
            </>
          ) : (
            'Save Dream'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddDreamForm;