import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// We need react-icons imported properly
import { FiLogOut } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <h2 className="text-xl font-bold text-gray-800">HR Analytics</h2>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-gray-600">
          <BiUserCircle className="w-6 h-6 mr-2" />
          <span className="font-medium">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center text-red-500 hover:text-red-700 transition-colors"
        >
          <FiLogOut className="w-5 h-5 mr-1" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
