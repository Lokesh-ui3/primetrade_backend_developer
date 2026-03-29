import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Hexagon } from 'lucide-react';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass border-b-0 border-white/5 py-4 px-6 md:px-12 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center space-x-3 isolate">
        <div className="bg-gradient-to-tr from-prime-neon to-prime-purple p-2 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          <Hexagon className="text-white w-6 h-6 shrink-0" strokeWidth={2.5}/>
        </div>
        <h1 className="text-2xl font-display font-extrabold tracking-tight text-white">
          PRIME<span className="text-prime-neon">TRADE</span>
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-200">{user?.name}</span>
          <span className="text-xs text-prime-neon uppercase tracking-wider font-bold">{user?.role}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 glass-button px-4 py-2 rounded-full"
        >
          <span>Exit</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
