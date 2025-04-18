import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch, FaPlus, FaEye, FaEdit, FaTrashAlt, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const College = () => {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/colleges", {
        withCredentials: true,
      });
      setColleges(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch colleges", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const firstConfirm = window.confirm("Are you sure you want to delete this college?");
    if (!firstConfirm) return;

    const secondConfirm = window.confirm("This action is irreversible. Confirm delete again?");
    if (!secondConfirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/colleges/${id}`, {
        withCredentials: true,
      });
      alert("College deleted successfully");
      fetchColleges();
    } catch (err) {
      console.error("Error deleting college:", err);
      alert("Failed to delete college");
    }
  };

  const filtered = colleges.filter((college) =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 bg-gray-100 min-h-full">
      <div className="w-full h-full p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          College List
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
              placeholder="Search colleges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border pl-10 pr-3 py-2 rounded border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          
          
          <button
              onClick={() => navigate("/home/dashboard/user/department")}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm">
              <FaBuilding className="inline" />
                 Department List
          </button>
    
          <button
            onClick={() => navigate("createcollege")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
          >
            <FaPlus className="inline mr-2" />
            Create College
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 border-b text-gray-700">
              <tr>
                <th className="text-center py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">College Name</th>
                <th className="text-left py-3 px-4">College Code</th>
                <th className="text-center py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((college, idx) => (
                  <tr key={college.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="text-center py-2 px-4">{college.id}</td>
                    <td className="text-left py-2 px-4">{college.name}</td>
                    <td className="text-left py-2 px-4">{college.code}</td>
                    <td className="text-center py-2 px-4">
                      <div className="flex items-center justify-center gap-4">
                        <FaEye
                          className="text-green-500 hover:scale-110 cursor-pointer"
                          onClick={() => navigate(`/home/entities/college/view/${college.id}`)}
                        />
                        <FaEdit
                          className="text-purple-500 hover:scale-110 cursor-pointer"
                          onClick={() => navigate(`/home/entities/college/edit/${college.id}`)}
                        />
                        <FaTrashAlt
                          className="text-red-500 hover:scale-110 cursor-pointer"
                          onClick={() => handleDelete(college.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No colleges found.
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

export default College;