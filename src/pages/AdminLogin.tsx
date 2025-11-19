import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { STORAGE_KEYS, MESSAGES } from '../constants/config';
import { ROUTES } from '../constants/routes';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await apiService.login({ userid, password });
      
      if (response.success) {
        // Store token in localStorage
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
        
        // Immediate redirect to dashboard without showing success message
        navigate(ROUTES.ADMIN.DASHBOARD);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : MESSAGES.ERROR.LOGIN_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush to-light-gold flex items-center justify-center px-4 py-20">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair font-bold gradient-text mb-2">
            SajoSajo
          </h1>
          <p className="text-gray-600">Admin Portal</p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off" data-lpignore="true" data-form-type="">
          {/* User ID */}
          <div>
            <label htmlFor="userid" className="block text-gray-700 font-semibold mb-2">
              User ID
            </label>
            <input
              type="text"
              id="userid"
              name="notusername"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose focus:outline-none transition-colors"
              placeholder="Enter your user ID"
              required
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-form-type=""
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="notpassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose focus:outline-none transition-colors"
              placeholder="Enter your password"
              required
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-form-type=""
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-rose to-soft-pink text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Login
              </>
            )}
          </button>
        </form>

        {/* Back to Site */}
        <div className="mt-6 text-center">
          <a href="/" className="text-gray-600 hover:text-rose transition-colors text-sm">
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};
