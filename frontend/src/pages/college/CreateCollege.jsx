import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CreateCollege = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collegeData = { name, code };

    try {
      const response = await fetch("http://localhost:5000/api/colleges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collegeData),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        navigate("/home/dashboard/user/college");
      } else {
        setError(data.message || "Error creating college");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error creating college");
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
            Back to College List
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New College
        </h1>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              College Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              College Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create College
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCollege;
