import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Shield, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLocalAuthStore } from '../store/localAuthStore';
import { useAdminStore } from '../store/adminStore';
import { Dashboard } from './Dashboard';
import { AdminDashboard } from './admin/AdminDashboard';

export function Layout() {
  const navigate = useNavigate();
  const { user, setUser, setIsAuthenticated } = useAuthStore();
  const localUser = useLocalAuthStore((state) => state.user);
  const localLogout = useLocalAuthStore((state) => state.logout);
  const { isAdmin, setAdmin } = useAdminStore();

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localLogout();
    setAdmin(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Security Awareness Training</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                {user?.name || localUser?.username}
                {isAdmin && ' (Admin)'}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isAdmin ? <AdminDashboard /> : <Dashboard />}
        <Outlet />
      </main>
    </div>
  );
}