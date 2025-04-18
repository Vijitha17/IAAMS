import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch, FaPlus, FaEye, FaEdit, FaTrashAlt,FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/departments", {
        withCredentials: true,
      });
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this department?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`, {
        withCredentials: true,
      });
      alert("Department deleted successfully");
      fetchDepartments();
    } catch (err) {
      console.error("Error deleting department:", err);
      alert("Failed to delete department");
    }
  };

  const filtered = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 bg-gray-100 min-h-full">
      <div className="w-full h-full p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Department List
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
              placeholder="Search departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            onClick={() => navigate("/home/dashboard/user/college")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm"
>
            <FaUniversity className="inline" />
            College List
          </button>

          <button
            onClick={() => navigate("createdepartment")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            <FaPlus className="inline mr-2" />
            Create Department
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b text-gray-700">
              <tr>
                <th className="text-center py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Department Name</th>
                <th className="text-left py-3 px-4">Code</th>
                <th className="text-left py-3 px-4">College</th>
                <th className="text-center py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((dept, idx) => (
                  <tr key={dept.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="text-center py-2 px-4">{dept.id}</td>
                    <td className="text-left py-2 px-4">{dept.name}</td>
                    <td className="text-left py-2 px-4">{dept.code}</td>
                    <td className="text-left py-2 px-4">{dept.college?.name}</td>
                    <td className="text-center py-2 px-4">
                      <div className="flex justify-center gap-4">
                        <FaEye
                          className="text-green-500 cursor-pointer hover:scale-110"
                          onClick={() => navigate(`/home/entities/department/view/${dept.id}`)}
                        />
                        <FaEdit
                          className="text-purple-500 cursor-pointer hover:scale-110"
                          onClick={() => navigate(`/home/entities/department/edit/${dept.id}`)}
                        />
                        <FaTrashAlt
                          className="text-red-500 cursor-pointer hover:scale-110"
                          onClick={() => handleDelete(dept.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No departments found.
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

export default Department;