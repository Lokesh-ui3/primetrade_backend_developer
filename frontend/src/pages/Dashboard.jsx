import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Plus, CheckCircle, Circle, Trash2, Clock, Users } from 'lucide-react';
import api from '../api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  const fetchData = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.data);
      
      if (isAdmin) {
        const usersResponse = await api.get('/admin/users');
        setAdminUsers(usersResponse.data.data);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    
    try {
      await api.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      fetchData();
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  const updateTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await api.put(`/tasks/${id}`, { status: newStatus });
      fetchData();
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchData();
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div className="min-h-screen bg-prime-dark pt-24 pb-12 relative overflow-hidden">
      <Navbar user={user} />
      
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prime-purple/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-prime-neon/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg relative mb-8 backdrop-blur animate-fade-in">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Create Task */}
          <div className="lg:col-span-4">
            <div className="glass p-6 rounded-2xl sticky top-28 animate-fade-in">
              <div className="flex items-center space-x-2 mb-6">
                <Plus className="text-prime-neon w-5 h-5" />
                <h2 className="text-xl font-display font-bold text-white">New Order Log</h2>
              </div>
              
              <form onSubmit={createTask} className="space-y-5">
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Subject / Asset</label>
                  <input 
                    type="text" 
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-prime-neon focus:ring-1 focus:ring-prime-neon text-white transition-colors" 
                    placeholder="e.g. BTC/USD Long Analysis"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Notes</label>
                  <textarea 
                    required
                    rows="4"
                    maxLength={500}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-prime-neon focus:ring-1 focus:ring-prime-neon text-white transition-colors resize-none" 
                    placeholder="Describe your thesis or technical indicators..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-white/10 hover:bg-prime-neon hover:text-prime-dark border border-white/10 text-white font-bold py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Entry</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Area - Tasks & Admin */}
          <div className="lg:col-span-8 space-y-8 animate-fade-in">
            
            {/* Admin Panel */}
            {isAdmin && (
              <div className="glass p-6 rounded-2xl border-prime-purple/30">
                <div className="flex items-center space-x-2 mb-6">
                  <Users className="text-prime-purple w-5 h-5" />
                  <h2 className="text-xl font-display font-bold text-white">Admin: User Roster</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {adminUsers.map(u => (
                    <div key={u._id} className="bg-black/40 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">{u.name}</p>
                        <p className="text-gray-400 text-xs">{u.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-prime-purple/20 text-prime-purple' : 'bg-gray-800 text-gray-400'}`}>
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Task List */}
            <div>
              <div className="flex items-center space-x-2 mb-6 ml-2">
                <Clock className="text-prime-neon w-5 h-5" />
                <h2 className="text-2xl font-display font-bold text-white">Active Logs</h2>
                <span className="bg-white/10 text-xs py-1 px-2 rounded-full text-gray-300 ml-3">{tasks.length} found</span>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-prime-neon"></div>
                </div>
              ) : tasks.length === 0 ? (
                <div className="glass p-12 rounded-2xl text-center border-dashed border-white/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                    <Clock className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Active Logs</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">Create a new order log or analysis note from the panel to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div 
                      key={task._id} 
                      className={`glass p-5 rounded-2xl group transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${task.status === 'completed' ? 'opacity-60 grayscale hover:grayscale-0' : 'hover:border-prime-neon/30'}`}
                    >
                      <div className="flex gap-4">
                        <button 
                          onClick={() => updateTaskStatus(task._id, task.status)}
                          className="mt-1 flex-shrink-0 focus:outline-none group-hover:scale-110 transition-transform"
                        >
                          {task.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-prime-neon" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-500 hover:text-prime-neon transition-colors" />
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg font-bold truncate transition-colors ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-white group-hover:text-prime-neon'}`}>
                            {task.title}
                          </h3>
                          <p className="text-gray-400 mt-2 text-sm leading-relaxed whitespace-pre-wrap word-break">
                            {task.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                            <span className="text-xs text-gray-500 font-medium">
                              {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                            </span>
                            <button 
                              onClick={() => deleteTask(task._id)}
                              className="text-xs flex items-center space-x-1 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
