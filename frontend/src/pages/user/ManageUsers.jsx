import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaSearch, 
  FaEdit, 
  FaTrashAlt, 
  FaUserPlus, 
  FaFilter,
  FaLock,
  FaUnlock,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedFilters, setExpandedFilters] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Apply filters when search term, role filter, or status filter changes
  useEffect(() => {
    let result = users;
    
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    if (statusFilter !== 'all') {
      result = result.filter(user => 
        statusFilter === 'active' ? user.isActive : !user.isActive
      );
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users', {
        withCredentials: true,
      });
      setUsers(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Failed to load users. Please try again.');
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        withCredentials: true,
      });
      toast.success('User deleted successfully');
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user');
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/users/${userId}/status`,
        { isActive: !currentStatus },
        { withCredentials: true }
      );
      toast.success(`User ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Error updating user status:', err);
      toast.error('Failed to update user status');
    }
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      management_admin: 'bg-purple-100 text-purple-800',
      management_people: 'bg-blue-100 text-blue-800',
      principal: 'bg-yellow-100 text-yellow-800',
      hod: 'bg-green-100 text-green-800',
      department_admin: 'bg-indigo-100 text-indigo-800',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          roleClasses[role] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {role.replace(/_/g, ' ')}
      </span>
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-100 min-h-full">
      <div className="w-full h-full p-4 md:p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Manage Users
        </h1>

        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Search and Filters */}
          <div className="w-full md:w-2/3">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button
                onClick={() => setExpandedFilters(!expandedFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                <FaFilter className="text-gray-600" />
                Filters {expandedFilters ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>

            {expandedFilters && (
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="management_admin">Management Admin</option>
                    <option value="management_people">Management People</option>
                    <option value="principal">Principal</option>
                    <option value="hod">HOD</option>
                    <option value="department_admin">Department Admin</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Create User Button */}
          <button
            onClick={() => navigate('/home/dashboard/user/create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            <FaUserPlus /> Create User
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* User Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {users.length === 0 ? 'No users found' : 'No users match your filters'}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    College
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.photo || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          {user.createdBy && (
                            <div className="text-xs text-gray-500">
                              Created by: {user.creator?.name || 'System'}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.college?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.department?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/home/dashboard/user/edit/${user.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.id, user.isActive)}
                          className={
                            user.isActive
                              ? 'text-yellow-600 hover:text-yellow-900'
                              : 'text-green-600 hover:text-green-900'
                          }
                          title={user.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {user.isActive ? <FaLock /> : <FaUnlock />}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;