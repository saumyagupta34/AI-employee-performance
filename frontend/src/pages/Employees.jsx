import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { MdSearch, MdAdd, MdFilterList, MdAutoGraph } from 'react-icons/md';
import AIRecommendation from '../components/AIRecommendation';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '', email: '', department: '', skills: '', performanceScore: '', experience: ''
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      let url = '/employees/search?';
      if (search) url += `q=${search}&`;
      if (departmentFilter) url += `department=${departmentFilter}`;
      
      const res = await api.get(url);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, departmentFilter]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };
      await api.post('/employees', payload);
      setIsAddModalOpen(false);
      setFormData({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding employee');
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openAIModal = (employee) => {
    setSelectedEmployee(employee);
    setIsAIModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Employees Directory</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
        >
          <MdAdd className="w-5 h-5 mr-1" /> Add Employee
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <MdSearch className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or skill..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64 relative">
          <MdFilterList className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <select 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 appearance-none"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Development">Development</option>
            <option value="HR">HR</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Testing">Testing</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading employees...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No employees found.</td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{emp.name}</div>
                      <div className="text-sm text-gray-500">{emp.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`font-bold ${emp.performanceScore >= 80 ? 'text-green-600' : emp.performanceScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {emp.performanceScore}/100
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {emp.experience} yrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openAIModal(emp)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 flex items-center justify-end w-full"
                      >
                        <MdAutoGraph className="mr-1" /> AI Review
                      </button>
                      <button 
                        onClick={() => deleteEmployee(emp._id)}
                        className="text-red-600 hover:text-red-900 mt-2 block w-full text-right"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" required className="mt-1 w-full border rounded-md p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" required className="mt-1 w-full border rounded-md p-2" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department</label>
                  <select required className="mt-1 w-full border rounded-md p-2" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                    <option value="">Select Department</option>
                    <option value="Development">Development</option>
                    <option value="HR">HR</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Testing">Testing</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                  <input type="text" className="mt-1 w-full border rounded-md p-2" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Score (0-100)</label>
                    <input type="number" min="0" max="100" required className="mt-1 w-full border rounded-md p-2" value={formData.performanceScore} onChange={e => setFormData({...formData, performanceScore: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Experience (yrs)</label>
                    <input type="number" min="0" required className="mt-1 w-full border rounded-md p-2" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Recommendation Modal */}
      {isAIModalOpen && selectedEmployee && (
        <AIRecommendation 
          employee={selectedEmployee} 
          onClose={() => setIsAIModalOpen(false)} 
        />
      )}

    </div>
  );
};

export default Employees;
