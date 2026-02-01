import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore, useUIStore } from './context/store';

// Layout Components
import Header from './components/Common/Header';
import Sidebar from './components/Common/Sidebar';
import Footer from './components/Common/Footer';

// Pages
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Students from './Pages/Students';
import Courses from './Pages/Courses';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Layout Wrapper for authenticated pages
const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

// Simple placeholder pages for remaining routes
const ProfilePage = () => (
  <div className="card p-8 text-center animate-fade-in">
    <h1 className="page-header mb-4">Profile</h1>
    <p className="text-slate-600 dark:text-slate-400">Profile page coming soon...</p>
  </div>
);

const ReportsPage = () => (
  <div className="card p-8 text-center animate-fade-in">
    <h1 className="page-header mb-4">Reports & Analytics</h1>
    <p className="text-slate-600 dark:text-slate-400">Reports page coming soon...</p>
  </div>
);

const AttendancePage = () => (
  <div className="card p-8 text-center animate-fade-in">
    <h1 className="page-header mb-4">Attendance Tracking</h1>
    <p className="text-slate-600 dark:text-slate-400">Attendance page coming soon...</p>
  </div>
);

const GradesPage = () => (
  <div className="card p-8 text-center animate-fade-in">
    <h1 className="page-header mb-4">Grades Management</h1>
    <p className="text-slate-600 dark:text-slate-400">Grades page coming soon...</p>
  </div>
);

function App() {
  const { theme } = useUIStore();

  useEffect(() => {
    // Apply theme on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Students />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Courses />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ReportsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AttendancePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/grades"
          element={
            <ProtectedRoute>
              <AppLayout>
                <GradesPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Page not found</p>
                <a href="/dashboard" className="btn-primary">
                  Go to Dashboard
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;