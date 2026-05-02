import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiEye, HiEyeOff, HiLockClosed } from 'react-icons/hi';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back, Admin!');
      navigate('/admin/dashboard');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary/40">
            <HiLockClosed size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">Admin Panel</h1>
          <p className="text-gray-400 mt-2">Sohel Khan Portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-2 block font-medium">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="admin@example.com"
              className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block font-medium">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Enter password"
                className="w-full px-5 py-4 pr-12 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                {show ? <HiEyeOff size={20}/> : <HiEye size={20}/>}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Default: sohel@admin.com / Admin@123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
