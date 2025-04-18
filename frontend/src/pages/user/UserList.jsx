import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });
      setUsers(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const roleClasses = {
      management_admin: "bg-purple-100 text-purple-800",
      management_people: "bg-blue-100 text-blue-800",
      principal: "bg-yellow-100 text-yellow-800",
      hod: "bg-green-100 text-green-800",
      department_admin: "bg-indigo-100 text-indigo-800",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleClasses[role] || 'bg-gray-100 text-gray-800'}`}>
        {role.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 min-h-full">
      <div className="w-full h-full p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          User Management
        </h1>

        <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm">
            <FaFilter className="text-gray-600" />
            Filter
          </button>

          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            onClick={() => navigate("/home/dashboard/user/create")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            <FaUser className="inline mr-2" />
            Create User
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b text-gray-700">
              <tr>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">College</th>
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-center py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <img 
                          src={user.photo} 
                          alt={user.name} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        {user.name}
                      </div>
                    </td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{getRoleBadge(user.role)}</td>
                    <td className="py-2 px-4">{user.college?.name || '-'}</td>
                    <td className="py-2 px-4">{user.department?.name || '-'}</td>
                    <td className="text-center py-2 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    {users.length === 0 ? 'No users found' : 'No matching users found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;