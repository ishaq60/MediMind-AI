"use client";

import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Search, User, Stethoscope } from 'lucide-react';

import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import Link from 'next/link';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/alluser");
        const data = await res.json();
        console.log("✅ Users fetched:", data.res);
        setUsers(data.res || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/alldoctor");
        const data = await res.json();
        console.log("✅ Doctors fetched:", data.res);
        setDoctors(data.res || []);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Stop loading when either is done
  useEffect(() => {
    if (users.length > 0 || doctors.length > 0) {
      setLoading(false);
    }
  }, [users, doctors]);

  const allUsers = [
    ...users.map(user => ({ ...user, role: 'User' })),
    ...doctors.map(doctor => ({ ...doctor, role: 'Doctor' })),
  ];

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = (user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

const handleDelete = async (id, role) => {
  console.log(id, role);

  Swal.fire({
  title: "Are you sure?",
  text: `You want to delete the  ${role}`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then (async(result) => {
  if (result.isConfirmed) {

     try {
    const endpoint = role === 'Doctor'
      ? `/api/deletedoctor/${id}`
      : `/api/deleteuser/${id}`;

    const res = await fetch(endpoint, {
      method: 'DELETE',
    });

    if (res.ok) {
      if (role === 'Doctor') {
        setDoctors(doctors.filter(d => d._id !== id));
        toast.success("Doctor deleted successfully")
      } else {
        setUsers(users.filter(u => u._id !== id));
           toast.success("user deleted successfully")
      }
    } else {
      console.error('Failed to delete user');
    }
  } catch (err) {
    console.error('Error deleting user:', err);
  }
  
  }
});
 
};

  const handleEdit = (id) => {
    console.log('Edit user:', id);
  };

  const handleCreate = () => {
    console.log('Create new user');
  };


 const handleMakeAdmin = async (id, role) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You want to make this ${role} an Admin?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, make Admin!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/makeadmin/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ role: "admin" })
        });

        if (res.ok) {
          // ✅ Update local state here
          setUsers(users.map(u =>
            u._id === id ? { ...u, role: "admin" } : u
          ));

       

          Swal.fire({
            title: "Updated!",
            text: "The user is now an Admin.",
            icon: "success"
          });
        } else {
          Swal.fire("Error", "Failed to make Admin.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  });
};


const handleCreateDoctor = () => {
  router.push('/dashboard/admin/addoctor');
};

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* ✅ Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage users and doctors in your system</p>
            </div>
            <button
              onClick={handleCreate}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2 rounded-xl p-2   bg-teal-500 hover:bg-teal-600 text-white text-white" />
              Add New User
            </button>
           <Link href="/dashboard/admin/addoctor">
            <button
              onClick={handleCreate}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2 rounded-xl p-2   bg-teal-500 hover:bg-teal-600 text-white text-white" />
              Add New Doctor
            </button>
           
           </Link>
          </div>
        </div>

        {/* ✅ Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Roles</option>
                <option value="Doctor">Doctors</option>
                <option value="User">Users</option>
              </select>
            </div>
          </div>
        </div>

        {/* ✅ Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-lg font-medium">Loading users...</p>
              </div>
            </div>
          ) : (
            <>
              {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 hidden sm:table-cell">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 hidden md:table-cell">Department</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 hidden lg:table-cell">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 hidden xl:table-cell">Join Date</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map(user => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                  {user.role === 'Doctor' ? (
                                    <Stethoscope className="h-5 w-5 text-white" />
                                  ) : (
                                    <User className="h-5 w-5 text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                                <div className="text-sm text-gray-500">{user.email || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 hidden sm:table-cell">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.type === 'Doctor'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.type}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900 hidden md:table-cell">
                            {user.department || user.specialty || 'N/A'}
                          </td>
                          <td className="py-4 px-4 hidden lg:table-cell">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              (user.status === 'Active' || !user.status)
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status || 'Active'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-900 hidden xl:table-cell">
                            {user.joinDate || user.createdAt ? new Date(user.joinDate || user.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <button onClick={() => handleEdit(user._id)} className="inline-flex items-center p-2 text-teal-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors" title="Edit user">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleDelete(user._id, user.role)} className="inline-flex items-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Delete user">
                                <Trash2 className="h-4 w-4" />
                              </button>
                              {
                                user?.type==="admin" ? 
                                 <button className='rounded-xl p-4  bg-indigo-400 text-white  '>{user.type}</button>
                                :<button onClick={() => handleMakeAdmin(user._id, user.role)} className=' rounded-xl p-2   bg-teal-500 hover:bg-teal-600 text-white text-white'>MakeAdmin</button>
                              }
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">
                    <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ✅ Pagination placeholder */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredUsers.length} of {allUsers.length} users
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;
