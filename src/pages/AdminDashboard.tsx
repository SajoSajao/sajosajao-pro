import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../constants/config';
import { ROUTES } from '../constants/routes';

interface User {
  userid: string;
  role: string;
  status: string;
}

export const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);

    if (!token || !userData) {
      setIsLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      // Invalid user data, clear storage
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    }

    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    navigate(ROUTES.ADMIN.LOGIN);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.ADMIN.LOGIN} replace />;
  }

  const menuItems = [
    { path: ROUTES.ADMIN.DASHBOARD, icon: 'fas fa-home', label: 'Dashboard' },
    { path: ROUTES.ADMIN.ENQUIRIES, icon: 'fas fa-users', label: 'Customer Enquiry' },
    { path: ROUTES.ADMIN.MESSAGES, icon: 'fas fa-envelope', label: 'Contact Messages' },
    { path: ROUTES.ADMIN.USERS, icon: 'fas fa-user-shield', label: 'User Management', adminOnly: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white shadow-xl flex-shrink-0 border-r border-gray-200 h-screen sticky top-0 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 mb-0.5">SajoSajo</h1>
          <p className="text-xs text-gray-500">Admin Portal</p>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fas fa-user text-blue-600 text-sm"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{user.userid}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 flex-1">
          {menuItems.map((item) => {
            if (item.adminOnly && user.role !== 'admin') return null;

            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 mb-1 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`${item.icon} w-4`}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all text-sm font-medium"
          >
            <i className="fas fa-sign-out-alt w-4"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">
              {location.pathname === '/admin/dashboard' && 'Dashboard'}
              {location.pathname === '/admin/dashboard/enquiries' && 'Customer Enquiries'}
              {location.pathname === '/admin/dashboard/messages' && 'Contact Messages'}
              {location.pathname === '/admin/dashboard/users' && 'User Management'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
