import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CreateDepartment = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/colleges", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setColleges(data.data);
    } catch (err) {
      console.error("Error fetching colleges", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const departmentData = { name, code, collegeId };

    try {
      const res = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(departmentData),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/home/dashboard/user/department");
      } else {
        setError(data.message || "Failed to create department");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to create department");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <button
            onClick={() => navigate("/home/dashboard/user/college")}
            className="flex items-center text-blue-600 hover:underline text-sm"
          >
            <FaArrowLeft className="mr-2" />
            Back to Department List
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Department
        </h1>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Department Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Department Code
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="collegeId" className="block text-sm font-medium text-gray-700">
              College
            </label>
            <select
              id="collegeId"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select College</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartment;
