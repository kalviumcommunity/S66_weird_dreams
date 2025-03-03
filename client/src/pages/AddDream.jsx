import { useState, useEffect} from 'react';

const DreamForm = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    userId: "6798b05ffa793a218f732d6f",
    title: "",
    description: "",
    emotions: [],
    lucid: false,
    nightmare: false,
    recurring: false,
    tags: [],
    newTag: "",
  });
  const emotions = [
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
  ];

  const fetchDreams = () => {
    setLoading(true);
    fetch(`http://localhost:8080/dream/get/${formData.userId}`)
      .then((res) => res.json())
      .then((res) => {
        setDreams(res.dreams);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDreams();
  },[]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleEmotionChange = (e) => {
    const selected=e.target.value
    if(!formData.emotions.includes(selected)){
      setFormData((prev)=>({
        ...prev, emotion:[...prev.emotions, selected]
      }))
    }
  };
  const removeEmotion=(emotion)=>{
    setFormData((prev)=>({
      ...prev, emotions: prev.emotions.filter((e)=>e!==emotion)
    }))
  }
  const addTag=()=>{
    if(formData.newTag.trim()!=="" && !formData.tags.includes(formData.newTag)){
        setFormData((prev)=>({
          ...prev, tags:[...prev.tags, `@${formData.newTag.trim()}`],
          newTag:" ",
        }))
    }
  }
  const removeTag = (tag) => {
    setFormData((prev) => ({
    ...prev,
    tags: prev.tags.filter((t) => t !== tag),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/dream/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok)
      throw new Error(result.message || "Failed to add dream");

      setFormData({
      ...formData,
      title: "",
      description: "",
      emotions: [],
      tags: [],
      });
      fetchDreams();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

    return (
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 opacity-30 bg-[url('../assets/background1.png')] bg-cover bg-center"></div>

        {showSuccess && (
          <div className="fixed top-5 right-5 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out">
            Dream added successfully!
          </div>
        )}

        <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-lg shadow-xl p-8 rounded-2xl border border-purple-400/50 mb-10">
          <h2 className="text-3xl font-bold text-purple-300 text-center">
            Add a Dream
          </h2>
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

        <div className="relative z-10 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-purple-300 text-center">
            Your Dreams
          </h2>
          {loading ? (
            <p className="text-gray-300 text-center mt-4">Loading...</p>
          ) : dreams.length > 0 ? (
            dreams.map((dream) => (
              <div
                key={dream._id}
                className="bg-white/10 backdrop-blur-lg shadow-xl p-6 rounded-2xl border border-purple-400/50 transition-transform transform hover:scale-105 mt-4"
              >
                <h3 className="text-xl font-bold text-purple-300">
                  {dream.title}
                </h3>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-300 text-center mt-4">
              No dreams added yet.
            </p>
          )}
        </div>
      </div>
    );
  };

export default DreamForm;
