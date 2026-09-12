/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const DreamCard = ({ dream, analyzeDream, handleDelete, onDelete, loadingId }) => {
    const navigate = useNavigate();
    const doDelete = handleDelete || onDelete;

    const formatDateTime = (dateString) => {
        if (!dateString) return "Unknown date";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Unknown date";
        return (
            date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            }) +
            " " +
            date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            })
        );
    };

    const author = dream?.userId?.username || dream?.username || "Anonymous dreamer";

    return (
      <div
        key={dream._id}
        className="bg-white/10 backdrop-blur-lg shadow-xl p-10 rounded-2xl border border-purple-400/50 transition-transform transform hover:scale-105 mb-6"
      >
        <h3 className="text-3xl font-bold text-purple-300 drop-shadow-md">
          {dream.title}
        </h3>
        <p className="text-lg text-gray-300 mt-4 max-h-40 overflow-auto break-words">
          {dream.description}
        </p>
        <div className="mt-6 space-y-4">
          <span className="block text-md text-gray-400">
            {formatDateTime(dream.date)}
          </span>
          <div>
            <strong>💭 Emotions:</strong>{" "}
            <span className="text-purple-300">{(dream.emotions || []).join(", ") || "—"}</span>
          </div>
          <div>
            <strong>🌙 Lucid:</strong>{" "}
            <span className="text-green-400">{dream.lucid ? "Yes" : "No"}</span>
          </div>
          <div>
            <strong>👻 Nightmare:</strong>{" "}
            <span className="text-red-400">
              {dream.nightmare ? "Yes" : "No"}
            </span>
          </div>
          <div>
            <strong>🔁 Recurring:</strong>{" "}
            <span className="text-yellow-300">
              {dream.recurring ? "Yes" : "No"}
            </span>
          </div>
          <div>
            <strong>🏷️ Tags:</strong>{" "}
            <span className="text-blue-300">{(dream.tags || []).join(", ") || "—"}</span>
          </div>
          <div>
            <strong>Created by: {author}</strong>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 justify-between">
            <button
              onClick={() => navigate(`/edit-dream/${dream._id}`)}
              className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-500 transition duration-200"
            >
              ✏️ Edit
            </button>
            {analyzeDream && (
              <button
                onClick={() => analyzeDream(dream._id, dream.description)}
                className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-500 transition duration-200"
                disabled={loadingId === dream._id}
              >
                {loadingId === dream._id ? "Analyzing..." : "Analyze with AI"}
              </button>
            )}
            {doDelete && (
              <button
                onClick={() => doDelete(`${dream._id}`)}
                className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition duration-200"
              >
                🗑️ Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
}

export default DreamCard
