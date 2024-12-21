import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Pyramid, LogOut, User, Settings } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-sand-50 bg-nubian-pattern">
      <nav className="bg-white shadow-sm border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Pyramid className="h-8 w-8 text-primary-500" />
                <span className="ml-2 text-xl font-display font-bold text-gray-900">Nubia Bench</span>
              </Link>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile"
                  className={`flex items-center transition-colors ${
                    isActive('/profile')
                      ? 'text-primary-500'
                      : 'text-gray-700 hover:text-primary-500'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-1" />
                  <span>Profile</span>
                </Link>
                <div className="flex items-center text-gray-700">
                  <User className="h-5 w-5 mr-1" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white border-t border-primary-100 mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Nubia Bench. Inspired by the rich heritage of ancient Nubia.
          </p>
        </div>
      </footer>
    </div>
  );
}