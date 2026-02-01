import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Bell, User, LogOut, Settings } from 'lucide-react';
import { useAuthStore, useUIStore } from '../../context/store';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUIStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 glass-effect border-b border-slate-200 dark:border-dark-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-lg gradient-text">
                  EduManage
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Student Portal
                </p>
              </div>
            </Link>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </button>

            {/* Notifications */}
            <button
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-700 transition-all duration-200 relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-700 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user?.role || 'Student'}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-dark-700 py-2 z-50 animate-slide-down">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-dark-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user?.email}
                      </p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-dark-700 text-slate-700 dark:text-slate-300 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                    
                    <div className="border-t border-slate-200 dark:border-dark-700 mt-2 pt-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;