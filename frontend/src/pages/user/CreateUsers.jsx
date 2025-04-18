import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa';

const CreateUsers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'department_admin',
    collegeId: '',
    departmentId: '',
    phone: '+234',
    bio: 'bio',
    photo: 'https://i.ibb.co/4pDNDk1/avatar.png'
  });
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch colleges and departments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesRes, departmentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/colleges', { withCredentials: true }),
          axios.get('http://localhost:5000/api/departments', { withCredentials: true })
        ]);
        setColleges(collegesRes.data.data || []);
        setDepartments(departmentsRes.data.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.role) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        navigate('/home/dashboard/user/list');
      } else {
        setErrors({ form: response.data.message || 'Failed to create user' });
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setErrors({ 
        form: err.response?.data?.message || 'An error occurred while creating user' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // Filter departments based on selected college
  const filteredDepartments = formData.collegeId 
    ? departments.filter(dept => dept.collegeId == formData.collegeId)
    : departments;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <button
            onClick={() => navigate('/home/dashboard/user/list')}
            className="flex items-center text-blue-600 hover:underline text-sm"
          >
            <FaArrowLeft className="mr-2" />
            Back to User List
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaUserPlus /> Create New User
        </h1>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="management_people">Management People</option>
                <option value="management_admin">Management Admin</option>
                <option value="principal">Principal</option>
                <option value="hod">HOD</option>
                <option value="department_admin">Department Admin</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College
              </label>
              <select
                name="collegeId"
                value={formData.collegeId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select College</option>
                {colleges.map(college => (
                  <option key={college.id} value={college.id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                disabled={!formData.collegeId}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Department</option>
                {filteredDepartments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={250}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                rows={2}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.bio.length}/250 characters
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <FaUserPlus /> Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUsers;