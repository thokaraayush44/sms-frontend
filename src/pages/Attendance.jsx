import { useState } from 'react';
import { Calendar as CalendarIcon, Check, X, Clock, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import DataTable from '../components/tables/DataTable';

const Attendance = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const students = [
        { id: 1, name: 'Sarah Johnson', status: 'present', timeIn: '08:55 AM' },
        { id: 2, name: 'Michael Chen', status: 'present', timeIn: '09:02 AM' },
        { id: 3, name: 'Emma Williams', status: 'absent', timeIn: '-' },
        { id: 4, name: 'James Brown', status: 'late', timeIn: '09:45 AM' },
        { id: 5, name: 'Emily Davis', status: 'present', timeIn: '08:50 AM' },
        { id: 6, name: 'Daniel Wilson', status: 'present', timeIn: '08:58 AM' },
        { id: 7, name: 'Olivia Martin', status: 'excused', timeIn: '-' },
        { id: 8, name: 'Lucas Anderson', status: 'present', timeIn: '09:00 AM' },
    ];

    const columns = [
        {
            key: 'name',
            header: 'Student Name',
            accessor: (row) => row.name,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-dark-700 flex items-center justify-center text-xs font-bold">
                        {row.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{row.name}</span>
                </div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            accessor: (row) => row.status,
            render: (row) => {
                const styles = {
                    present: 'bg-green-100 text-green-700 border-green-200',
                    absent: 'bg-red-100 text-red-700 border-red-200',
                    late: 'bg-orange-100 text-orange-700 border-orange-200',
                    excused: 'bg-blue-100 text-blue-700 border-blue-200',
                };

                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[row.status] || 'bg-slate-100 border-slate-200'}`}>
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                );
            },
        },
        {
            key: 'timeIn',
            header: 'Time In',
            accessor: (row) => row.timeIn,
        },
        {
            key: 'actions',
            header: 'Mark Attendance',
            render: (row) => (
                <div className="flex gap-1">
                    <button className="p-1.5 rounded hover:bg-green-100 text-slate-400 hover:text-green-600 transition-colors" title="Present">
                        <Check className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors" title="Absent">
                        <X className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-orange-100 text-slate-400 hover:text-orange-600 transition-colors" title="Late">
                        <Clock className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="page-header">Attendance</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Daily attendance tracking and management
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-dark-800 p-2 rounded-xl border border-slate-200 dark:border-dark-700 shadow-sm">
                    <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 px-2">
                        <CalendarIcon className="w-4 h-4 text-primary-600" />
                        <span className="font-semibold text-slate-900 dark:text-white">
                            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                    <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-700 text-slate-500">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card p-4 flex items-center gap-4 border-l-4 border-l-green-500">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <Check className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Present</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">85%</p>
                    </div>
                </div>
                <div className="card p-4 flex items-center gap-4 border-l-4 border-l-red-500">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <X className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Absent</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">5%</p>
                    </div>
                </div>
                <div className="card p-4 flex items-center gap-4 border-l-4 border-l-orange-500">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Late</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">8%</p>
                    </div>
                </div>
                <div className="card p-4 flex items-center gap-4 border-l-4 border-l-blue-500">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Excused</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">2%</p>
                    </div>
                </div>
            </div>

            <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="section-title text-lg mb-0">Class Attendance Sheet</h3>
                    <select className="input-field w-auto py-2 text-sm">
                        <option>Computer Science 101</option>
                        <option>Mathematics 201</option>
                        <option>Physics 102</option>
                    </select>
                </div>
                <DataTable columns={columns} data={students} />
            </div>
        </div>
    );
};

export default Attendance;
