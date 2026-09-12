/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AddDreamForm = ({
  formData,
  setFormData,
  emotions,
  fetchDreams,
  setShowSuccess,
  token,
}) => {
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
    if (
      cleaned !== "" &&
      !formData.tags.includes(`@${cleaned}`) &&
      !formData.tags.includes(cleaned)
    ) {
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

    // Validation
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

      const response = await axios.post(
        `${API_BASE_URL}/dream/create`,
        dreamData,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        }
      );

      console.log("API Response:", response.data);

      // Reset form
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
      const errorMsg = error.response?.data?.error || error.message || "Failed to save dream";
      setSubmitError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {submitError && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4">
          <p className="text-red-200 text-sm">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="title"
          placeholder="Dream Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          required
          disabled={isSubmitting}
        />
        <textarea
          name="description"
          placeholder="Describe your dream..."
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 disabled:opacity-50"
          required
          disabled={isSubmitting}
        ></textarea>

        <div className="flex">
          <label className="text-purple-300">Dream Type</label>
          <label className="flex items-center ml-2">
            <input
              type="checkbox"
              name="lucid"
              checked={formData.lucid}
              onChange={handleChange}
              className="form-checkbox text-purple-500"
              disabled={isSubmitting}
            />
            <span className="ml-1">Lucid</span>
          </label>
          <label className="flex items-center ml-2">
            <input
              type="checkbox"
              name="nightmare"
              checked={formData.nightmare}
              onChange={handleChange}
              className="form-checkbox text-purple-500"
              disabled={isSubmitting}
            />
            <span className="ml-1">Nightmare</span>
          </label>
          <label className="flex items-center ml-2">
            <input
              type="checkbox"
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
              className="form-checkbox text-purple-500"
              disabled={isSubmitting}
            />
            <span className="ml-1">Recurring</span>
          </label>
        </div>

        <div>
          <label className="text-purple-300">Select Emotions</label>
          <select
            onChange={handleEmotionChange}
            className="w-full mt-2 p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            disabled={isSubmitting}
          >
            <option value="">-- Choose an Emotion --</option>
            {emotions.map((emotion) => (
              <option key={emotion} value={emotion}>
                {emotion}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap mt-2 space-x-2">
            {formData.emotions.map((emotion) => (
              <span
                key={emotion}
                className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-purple-600"
                onClick={() => !isSubmitting && removeEmotion(emotion)}
              >
                {emotion} ✖
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="text-purple-300">Tags</label>
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              name="newTag"
              placeholder="Enter a tag"
              value={formData.newTag}
              onChange={handleChange}
              className="flex-1 p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold transition-transform transform hover:scale-105 disabled:opacity-50"
              disabled={isSubmitting}
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap mt-2 space-x-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-blue-600"
                onClick={() => !isSubmitting && removeTag(tag)}
              >
                {tag} ✖
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
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
