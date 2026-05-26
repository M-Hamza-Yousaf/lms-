import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      const response = await axios.post('https://lms-production-b53d.up.railway.app/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const userRole = response.data.user.role;
      if (userRole === 'student') navigate('/student/dashboard');
      else if (userRole === 'teacher') navigate('/teacher/dashboard');
      else navigate('/admin/dashboard');

    } catch (error) {
      if (error.response && error.response.data) {
        setServerError(error.response.data.message || 'Login failed');
      } else {
        setServerError('Cannot connect to server. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-textDark mb-2">Welcome Back! 👋</h2>
            <p className="text-textLight">Sign in to continue to your LMS</p>
          </div>

          {serverError && (
            <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-4 text-sm">
              ⚠️ {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-2 bg-bg p-1.5 rounded-xl">
              {['student', 'teacher', 'admin'].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition ${
                    formData.role === role 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-textLight hover:text-textDark'
                  }`}
                  onClick={() => setFormData({ ...formData, role })}
                >
                  {role === 'student' && '🎓 Student'}
                  {role === 'teacher' && '👨‍🏫 Teacher'}
                  {role === 'admin' && '⚙️ Admin'}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition ${
                  errors.email ? 'border-danger' : 'border-border focus:border-primary'
                }`}
              />
              {errors.email && <span className="text-danger text-xs mt-1 block">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition ${
                    errors.password ? 'border-danger' : 'border-border focus:border-primary'
                  }`}
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {errors.password && <span className="text-danger text-xs mt-1 block">{errors.password}</span>}
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-textLight">
                <input type="checkbox" className="cursor-pointer" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Signing In...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-textLight">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;