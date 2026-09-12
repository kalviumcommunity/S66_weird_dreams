/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const UserComp = ({ user }) => {
    return (
        <li className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                    {(user.username || "U")[0].toUpperCase()}
                </span>
                <div>
                    <p className="text-sm font-semibold text-ink">{user.username}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                </div>
            </div>
            <Link
                to={`/dreams/${user._id}`}
                className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-ink hover:bg-slate-50"
            >
                View dreams
            </Link>
        </li>
    );
};

export default UserComp;