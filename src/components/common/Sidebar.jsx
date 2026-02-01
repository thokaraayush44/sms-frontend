import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart3, 
  User, 
  Calendar,
  FileText,
  X
} from 'lucide-react';
import { useUIStore } from '../../context/store';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/students', icon: Users, label: 'Students' },
    { path: '/courses', icon: BookOpen, label: 'Courses' },
    { path: '/reports', icon: BarChart3, label: 'Reports' },
    { path: '/attendance', icon: Calendar, label: 'Attendance' },
    { path: '/grades', icon: FileText, label: 'Grades' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 glass-effect border-r border-slate-200 dark:border-dark-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-dark-700">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h2 className="font-display font-bold text-lg gradient-text">
                  EduManage
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Admin Portal
                </p>
              </div>
            </Link>
            
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                  className={`sidebar-link ${active ? 'sidebar-link-active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-dark-700">
            <div className="card p-4 bg-gradient-to-br from-primary-50 to-indigo-50 dark:from-primary-900/20 dark:to-indigo-900/20 border-primary-200 dark:border-primary-800">
              <p className="text-xs font-semibold text-primary-900 dark:text-primary-300 mb-1">
                Need Help?
              </p>
              <p className="text-xs text-primary-700 dark:text-primary-400 mb-3">
                Check our documentation
              </p>
              <button className="w-full text-xs btn-primary py-2">
                View Docs
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;