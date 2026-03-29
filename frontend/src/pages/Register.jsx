import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        name,
        email,
        password,
        role
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try a different email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-prime-dark overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-prime-purple/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-prime-neon/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>

      <div className="relative w-full max-w-md p-8 glass rounded-2xl animate-fade-in z-10 m-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-gradient-to-tr from-prime-purple to-prime-neon p-3 rounded-xl shadow-[0_0_20px_rgba(138,43,226,0.4)] mb-4">
            <Hexagon className="text-white w-8 h-8 shrink-0" strokeWidth={2.5}/>
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">Join Primetrade</h2>
          <p className="text-gray-400 mt-2 text-sm">Create your terminal access</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg relative mb-6 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-prime-purple focus:ring-1 focus:ring-prime-purple text-white transition-colors" 
              placeholder="e.g. Satoshi Nakamoto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-prime-purple focus:ring-1 focus:ring-prime-purple text-white transition-colors" 
              placeholder="trader@primetrade.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-prime-purple focus:ring-1 focus:ring-prime-purple text-white transition-colors" 
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Account Role</label>
            <select 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-prime-purple focus:ring-1 focus:ring-prime-purple text-white transition-colors appearance-none cursor-pointer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user" className="bg-prime-dark text-white">Standard User</option>
              <option value="admin" className="bg-prime-dark text-prime-neon">System Administrator (Admin)</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-prime-purple to-prime-neon hover:from-fuchsia-500 hover:to-prime-neon text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(138,43,226,0.5)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-prime-purple hover:text-white transition-colors font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
