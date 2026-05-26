import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }

    setServerError('');
  };

  const validateForm = () => {

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Please agree to terms';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {

      const response = await axios.post(
        'https://lms-production-b53d.up.railway.app/api/auth/signup',
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      localStorage.setItem('token', response.data.token);

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      alert('Account created successfully!');

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

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-blue-100">

      <div className="w-full max-w-md">

        <div className="bg-white p-8 rounded-2xl shadow-2xl">

          <div className="text-center mb-8">

            <h2 className="text-2xl font-bold text-textDark mb-2">
              Create Account 🚀
            </h2>

            <p className="text-textLight">
              Join our LMS and start learning today
            </p>

          </div>

          {serverError && (
            <div className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg mb-4 text-sm">
              ⚠️ {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-textDark mb-1.5">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />

              {errors.fullName && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.fullName}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-1.5">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />

              {errors.email && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-1.5">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg pr-12"
                />

                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>

              </div>

              {errors.password && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.password}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-1.5">
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg pr-12"
                />

                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>

              </div>

              {errors.confirmPassword && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm">

                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />

                I agree to Terms & Conditions

              </label>

              {errors.agreeTerms && (
                <span className="text-danger text-xs mt-1 block">
                  {errors.agreeTerms}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg"
            >
              {loading ? '⏳ Creating...' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-textLight">

              Already have an account?{' '}

              <Link
                to="/login"
                className="text-primary font-semibold"
              >
                Login
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Signup;