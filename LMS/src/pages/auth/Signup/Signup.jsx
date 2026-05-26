import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', role: 'student', agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.trim().length < 3) newErrors.fullName = 'Name must be at least 3 characters';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      const response = await axios.post('https://lms-production-b53d.up.railway.app/api/auth/signup', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert('Account created successfully! Please login.');
      navigate('/login');

    } catch (error) {
      if (error.response && error.response.data) {
        setServerError(error.response.data.message || 'Signup failed');
      } else {
        setServerError('Cannot connect to server. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { level: 0, text: '', color: '' };
    if (pwd.length < 6) return { level: 1, text: 'Weak', color: 'bg-danger' };
    if (pwd.length < 10) return { level: 2, text: 'Medium', color: 'bg-secondary' };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return { level: 3, text: 'Strong', color: 'bg-success' };
    return { level: 2, text: 'Medium', color: 'bg-secondary' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-textDark mb-2">Create Account 🚀</h2>
            <p className="text-textLight">Join our LMS and start learning today</p>
          </div>

          {serverError && (
            <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-4 text-sm">
              ⚠️ {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-2 bg-bg p-1.5 rounded-xl">
              {['student', 'teacher'].map((role) => (
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
                  {role === 'student' ? '🎓 Student' : '👨‍🏫 Teacher'}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-1.5">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition ${
                  errors.fullName ? 'border-danger' : 'border-border focus:border-primary'
                }`}
              />
              {errors.fullName && <span className="text-danger text-xs mt-1 block">{errors.fullName}</span>}
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
                  placeholder="Create a password"
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
              
              {formData.password && (
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 flex gap-1">
                    <div className={`flex-1 h-1 rounded ${strength.level >= 1 ? strength.color : 'bg-border'}`}></div>
                    <div className={`flex-1 h-1 rounded ${strength.level >= 2 ? strength.color : 'bg-border'}`}></div>
                    <div className={`flex-1 h-1 rounded ${strength.level >= 3 ? strength.color : 'bg-border'}`}></div>
                  </div>
                  <span className={`text-xs font-semibold ${
                    strength.level === 1 ? 'text-danger' : 
                    strength.level === 2 ? 'text-secondary' : 'text-success'
                  }`}>
                    {strength.text}
                  </span>
                </div>
              )}
              
              {errors.password && <span className="text-danger text-xs mt-1 block">{errors.password}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition ${
                    errors.confirmPassword ? 'border-danger' : 'border-border focus:border-primary'
                  }`}
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {errors.confirmPassword && <span className="text-danger text-xs mt-1 block">{errors.confirmPassword}</span>}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer text-sm text-textLight leading-relaxed">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 cursor-pointer accent-primary flex-shrink-0"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary font-medium hover:underline">Terms & Conditions</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeTerms && <span className="text-danger text-xs mt-1 block">{errors.agreeTerms}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primary-dark hover:-translate-y-0.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-textLight">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;