import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, TrendingUp, Award, Plus, ArrowRight } from 'lucide-react';
import StatCard from '../components/charts/StatCard';
import StudentChart from '../components/charts/StudentChart';
import { reportsAPI } from '../services/api';
import Loading from '../components/common/Loading';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Simulating API call with mock data
      // In production: const response = await reportsAPI.getDashboardStats();
      setTimeout(() => {
        setStats({
          totalStudents: 1247,
          totalCourses: 42,
          activeEnrollments: 3842,
          averageGrade: 85.4,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Jan', students: 950 },
    { name: 'Feb', students: 1020 },
    { name: 'Mar', students: 1100 },
    { name: 'Apr', students: 1150 },
    { name: 'May', students: 1200 },
    { name: 'Jun', students: 1247 },
  ];

  const recentActivities = [
    { id: 1, student: 'Sarah Johnson', action: 'Enrolled in Advanced Mathematics', time: '2 hours ago' },
    { id: 2, student: 'Michael Chen', action: 'Completed Data Structures exam', time: '3 hours ago' },
    { id: 3, student: 'Emma Williams', action: 'Submitted Physics assignment', time: '5 hours ago' },
    { id: 4, student: 'James Brown', action: 'Joined Chemistry Lab', time: '6 hours ago' },
  ];

  const upcomingCourses = [
    { id: 1, name: 'Machine Learning Basics', instructor: 'Dr. Smith', students: 28, capacity: 30 },
    { id: 2, name: 'Web Development', instructor: 'Prof. Davis', students: 35, capacity: 40 },
    { id: 3, name: 'Database Systems', instructor: 'Dr. Johnson', students: 22, capacity: 25 },
  ];

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back! Here's what's happening with your students today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats?.totalStudents?.toLocaleString()}
          icon={Users}
          trend="up"
          trendValue="+12.5%"
          color="primary"
          delay={0}
        />
        <StatCard
          title="Active Courses"
          value={stats?.totalCourses}
          icon={BookOpen}
          trend="up"
          trendValue="+5.2%"
          color="success"
          delay={100}
        />
        <StatCard
          title="Enrollments"
          value={stats?.activeEnrollments?.toLocaleString()}
          icon={TrendingUp}
          trend="up"
          trendValue="+18.3%"
          color="warning"
          delay={200}
        />
        <StatCard
          title="Average Grade"
          value={`${stats?.averageGrade}%`}
          icon={Award}
          trend="up"
          trendValue="+2.1%"
          color="info"
          delay={300}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Growth Chart */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title mb-0">Student Growth</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Monthly enrollment trends
              </p>
            </div>
            <select className="px-4 py-2 rounded-xl border border-slate-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-sm">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <StudentChart data={chartData} type="area" />
        </div>

        {/* Recent Activities */}
        <div className="card p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0">Recent Activities</h2>
            <Link to="/students" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-semibold">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-700/50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {activity.student.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {activity.student}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Courses */}
      <div className="card p-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">Upcoming Courses</h2>
          <Link
            to="/courses"
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Course
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingCourses.map((course) => (
            <div
              key={course.id}
              className="card p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {course.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {course.instructor}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Enrolled:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {course.students}/{course.capacity}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-dark-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.students / course.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button className="mt-4 w-full btn-secondary py-2 text-sm group-hover:border-primary-500 dark:group-hover:border-primary-500">
                View Details
                <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '700ms' }}>
        <Link
          to="/students?action=add"
          className="card p-6 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              Add Student
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Enroll new student
            </p>
          </div>
        </Link>

        <Link
          to="/courses?action=add"
          className="card p-6 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              Create Course
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Add new course
            </p>
          </div>
        </Link>

        <Link
          to="/reports"
          className="card p-6 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              View Reports
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Analytics & insights
            </p>
          </div>
        </Link>

        <Link
          to="/attendance"
          className="card p-6 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              Attendance
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track attendance
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;