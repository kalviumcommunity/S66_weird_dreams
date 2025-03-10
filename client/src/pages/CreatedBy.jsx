import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

const CreatedBy = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
        const response = await axios.get(`http://localhost:8080/api/users`);
        console.log("Fetched users: ", response.data.users);
        setUsers(response.data.users);
        } catch (error) {
        console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); 

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold text-white mb-6">Users</h1>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          {users.length === 0 ? (
            <p className="text-gray-500 text-center">No users found.</p>
          ) : (
            <ul className="divide-y divide-gray-300">
              {users.map((user) => (
                <li key={user._id} className="py-3">
                  <Link
                    to={`/dreams/${user._id}`}
                    className="text-lg font-semibold text-black-600 hover:text-blue-700 hover:underline transition duration-300"
                  >
                    {user.username}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
};

export default CreatedBy;
