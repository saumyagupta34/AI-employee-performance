import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdPeople } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="w-64 bg-indigo-900 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-indigo-800">
        <h1 className="text-2xl font-bold tracking-wider">AI HR</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            }`
          }
        >
          <MdDashboard className="w-6 h-6 mr-3" />
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            }`
          }
        >
          <MdPeople className="w-6 h-6 mr-3" />
          <span className="font-medium">Employees</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
