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
    const flags = [
        dream.lucid && "Lucid",
        dream.nightmare && "Nightmare",
        dream.recurring && "Recurring",
    ].filter(Boolean);

    return (
      <article className="mb-5 rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-ink">
              {dream.title}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {formatDateTime(dream.date)} · by {author}
            </p>
          </div>
          {flags.length > 0 && (
            <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
              {flags.map((f) => (
                <span key={f} className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 max-h-40 overflow-auto break-words text-[15px] leading-relaxed text-slate-700 custom-scrollbar">
          {dream.description}
        </p>

        {(dream.emotions?.length > 0 || dream.tags?.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(dream.emotions || []).map((e) => (
              <span key={e} className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
                {e}
              </span>
            ))}
            {(dream.tags || []).map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
          <button
            onClick={() => navigate(`/edit-dream/${dream._id}`)}
            className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-slate-300 hover:bg-slate-50"
          >
            Edit
          </button>
          {analyzeDream && (
            <button
              onClick={() => analyzeDream(dream._id, dream.description)}
              className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              disabled={loadingId === dream._id}
            >
              {loadingId === dream._id ? "Analyzing…" : "✦ Analyze with AI"}
            </button>
          )}
          {doDelete && (
            <button
              onClick={() => doDelete(`${dream._id}`)}
              className="ml-auto rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>
      </article>
    );
}

export default DreamCard

