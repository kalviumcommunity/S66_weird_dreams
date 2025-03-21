/* eslint-disable react/prop-types */

const AddDreamForm = ({
  formData,
  setFormData,
  emotions,
  fetchDreams,
  setShowSuccess,
}) => {
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

  const removeEmotion = (emotion) => {
    setFormData((prev) => ({
      ...prev,
      emotions: prev.emotions.filter((e) => e !== emotion),
    }));
  };

  const addTag = () => {
    if (
      formData.newTag.trim() !== "" &&
      !formData.tags.includes(formData.newTag)
    ) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, `@${formData.newTag.trim()}`],
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
    try {
      const { newTag, ...filteredData } = formData;

      const response = await fetch("http://localhost:8080/dream/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredData), 
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok)
        throw new Error(result.message || "Failed to add dream");

      setFormData({
        userId: formData.userId,
        title: "",
        description: "",
        emotions: [],
        tags: [],
        lucid: false,
        nightmare: false,
        recurring: false,
        newTag: "", 
      });

      fetchDreams();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="title"
          placeholder="Dream Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <textarea
          name="description"
          placeholder="Describe your dream..."
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
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
            />
            <span>Lucid</span>
          </label>
          <label className="flex items-center ml-2">
            <input
              type="checkbox"
              name="nightmare"
              checked={formData.nightmare}
              onChange={handleChange}
              className="form-checkbox text-purple-500"
            />
            <span>Nightmare</span>
          </label>
          <label className="flex items-center ml-2">
            <input
              type="checkbox"
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
              className="form-checkbox text-purple-500"
            />
            <span>Recurring</span>
          </label>
        </div>

        <div>
          <label className="text-purple-300">Select Emotions</label>
          <select
            onChange={handleEmotionChange}
            className="w-full mt-2 p-3 rounded-lg bg-gray-900 text-white border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                onClick={() => removeEmotion(emotion)}
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
          Save Dream
        </button>
      </form>
    </div>
  );
};

export default AddDreamForm;
