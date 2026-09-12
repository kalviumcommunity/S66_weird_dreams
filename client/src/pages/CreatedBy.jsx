/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserComp from "../components/UserComp";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config";

const CreatedBy = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      console.log("Fetched users: ", response.data.users);
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-10 sm:px-6">
        <h1 className="mb-1 text-center text-3xl font-bold tracking-tight">Dreamers ✨</h1>
        <p className="mb-8 text-sm text-muted">People keeping a dream journal</p>

        <div className="w-full rounded-2xl border border-line bg-white p-6 shadow-sm">
          {loading ? (
            <div className="flex items-center gap-3 text-muted">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent"></span>
              <span>Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-muted">No dreamers yet.</p>
          ) : (
            <ul className="divide-y divide-line">
              {users.map((user) => (
                <UserComp key={user._id} user={user} />
              ))}
            </ul>
          )}
        </div>

        <Link to="/dreams" className="mt-6 text-sm font-medium text-accent hover:text-violet-700">
          ← Back to my journal
        </Link>
      </div>
    </div>
  );
};

export default CreatedBy;