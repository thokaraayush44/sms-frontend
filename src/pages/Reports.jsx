import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';
import StatCard from '../components/charts/StatCard';

const Reports = () => {
    const enrollmentData = [
        { name: 'Computer Science', students: 120 },
        { name: 'Mathematics', students: 85 },
        { name: 'Physics', students: 65 },
        { name: 'Chemistry', students: 50 },
        { name: 'Biology', students: 78 },
        { name: 'Engineering', students: 95 },
    ];

    const attendanceData = [
        { name: 'Mon', present: 850, absent: 50 },
        { name: 'Tue', present: 840, absent: 60 },
        { name: 'Wed', present: 860, absent: 40 },
        { name: 'Thu', present: 855, absent: 45 },
        { name: 'Fri', present: 830, absent: 70 },
    ];

    const gradeDistribution = [
        { name: 'A Grade', value: 35 },
        { name: 'B Grade', value: 45 },
        { name: 'C Grade', value: 15 },
        { name: 'F Grade', value: 5 },
    ];

    const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-header">Reports & Analytics</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Comprehensive academic performance overview
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-secondary flex items-center gap-2 text-sm py-2">
                        <Calendar className="w-4 h-4" />
                        Last 30 Days
                    </button>
                    <button className="btn-secondary flex items-center gap-2 text-sm py-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="btn-primary flex items-center gap-2 text-sm py-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Department Enrollment */}
                <div className="card p-6">
                    <h3 className="section-title text-lg mb-6">Enrollment by Department</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={enrollmentData}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        borderRadius: '0.75rem',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Bar dataKey="students" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attendance Trends */}
                <div className="card p-6">
                    <h3 className="section-title text-lg mb-6">Weekly Attendance Trends</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        borderRadius: '0.75rem',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Grade Distribution */}
                <div className="card p-6 lg:col-span-1">
                    <h3 className="section-title text-lg mb-6">Overall Grade Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={gradeDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {gradeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {gradeDistribution.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                                <span className="text-xs text-slate-600 dark:text-slate-400">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performers */}
                <div className="card p-6 lg:col-span-2">
                    <h3 className="section-title text-lg mb-4">Top Performing Students</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <th className="pb-3">Student</th>
                                    <th className="pb-3">Department</th>
                                    <th className="pb-3">GPA</th>
                                    <th className="pb-3">Rank</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { name: 'Alice Williams', dept: 'Computer Science', gpa: '3.98', rank: 1 },
                                    { name: 'John Doe', dept: 'Mathematics', gpa: '3.95', rank: 2 },
                                    { name: 'Emily Davis', dept: 'Physics', gpa: '3.92', rank: 3 },
                                    { name: 'Michael Brown', dept: 'Engineering', gpa: '3.90', rank: 4 },
                                    { name: 'Sarah Wilson', dept: 'Biology', gpa: '3.88', rank: 5 },
                                ].map((student, i) => (
                                    <tr key={i} className="border-t border-slate-100 dark:border-dark-700">
                                        <td className="py-3 font-medium text-slate-900 dark:text-white">{student.name}</td>
                                        <td className="py-3 text-slate-600 dark:text-slate-400">{student.dept}</td>
                                        <td className="py-3 font-bold text-primary-600 dark:text-primary-400">{student.gpa}</td>
                                        <td className="py-3">
                                            <span className="badge badge-primary">#{student.rank}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
