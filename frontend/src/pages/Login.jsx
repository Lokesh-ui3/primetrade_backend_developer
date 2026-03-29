import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-prime-dark overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-prime-purple/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-prime-neon/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000"></div>

      <div className="relative w-full max-w-md p-8 glass rounded-2xl animate-fade-in z-10 m-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-gradient-to-tr from-prime-neon to-prime-purple p-3 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.4)] mb-4">
            <Hexagon className="text-white w-8 h-8 shrink-0" strokeWidth={2.5}/>
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 mt-2 text-sm">Access your trading terminal</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg relative mb-6 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-prime-neon focus:ring-1 focus:ring-prime-neon text-white transition-colors" 
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-prime-neon focus:ring-1 focus:ring-prime-neon text-white transition-colors" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-prime-neon to-blue-500 hover:from-blue-400 hover:to-prime-purple text-prime-dark font-bold py-3 px-4 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? 'Authenticating...' : 'Log In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-prime-neon hover:text-white transition-colors font-semibold">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
