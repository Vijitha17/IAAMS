import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaUserEdit } from 'react-icons/fa';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    collegeId: '',
    departmentId: '',
    phone: '',
    bio: '',
    isActive: true
  });
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, collegesRes, departmentsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${id}`, { withCredentials: true }),
          axios.get('http://localhost:5000/api/colleges', { withCredentials: true }),
          axios.get('http://localhost:5000/api/departments', { withCredentials: true })
        ]);
        
        const userData = userRes.data.data;
        
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          role: userData.role || '',
          collegeId: userData.collegeId || '',
          departmentId: userData.departmentId || '',
          phone: userData.phone || '',
          bio: userData.bio || '',
          isActive: userData.isActive
        });
        
        setColleges(collegesRes.data.data || []);
        setDepartments(departmentsRes.data.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        setErrors({ form: 'Failed to load user data' });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
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
      const response = await axios.put(`http://localhost:5000/api/users/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        navigate('/home/dashboard/user/manage');
      } else {
        setErrors({ form: response.data.message || 'Failed to update user' });
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setErrors({ 
        form: err.response?.data?.message || 'An error occurred while updating user' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter departments based on selected college
  const filteredDepartments = formData.collegeId 
    ? departments.filter(dept => dept.collegeId == formData.collegeId)
    : departments;

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <button
            onClick={() => navigate('/home/dashboard/user/manage')}
            className="flex items-center text-blue-600 hover:underline text-sm"
          >
            <FaArrowLeft className="mr-2" />
            Back to User List
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaUserEdit /> Edit User
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

            {/* Active Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="isActive"
                value={formData.isActive}
                onChange={e => setFormData({...formData, isActive: e.target.value === 'true'})}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength={250}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                rows={3}
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
                  Updating...
                </>
              ) : (
                <>
                  <FaUserEdit /> Update User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;