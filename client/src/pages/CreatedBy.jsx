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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900">
      <Navbar />
      <div className="flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Dreamers ✨</h1>
        <p className="text-gray-300 mb-6">Click a user to see their public dreams</p>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          {loading ? (
            <p className="text-gray-500 text-center">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500 text-center">No users found.</p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {users.map((user) => (
                <UserComp key={user._id} user={user} />
              ))}
            </ul>
          )}
        </div>
        <Link to="/dreams" className="mt-6 text-purple-300 hover:text-white underline">
          ← Back to all dreams
        </Link>
      </div>
    </div>
  );
};

export default CreatedBy;
