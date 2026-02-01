import { useState } from 'react';
import { Search, Download, FileText, ChevronDown } from 'lucide-react';
import DataTable from '../components/tables/DataTable';

const Grades = () => {
    const grades = [
        { id: 1, student: 'Sarah Johnson', course: 'Computer Science 101', midTerm: 88, final: 92, total: 90, grade: 'A' },
        { id: 2, student: 'Michael Chen', course: 'Computer Science 101', midTerm: 76, final: 82, total: 79, grade: 'B' },
        { id: 3, student: 'Emma Williams', course: 'Computer Science 101', midTerm: 95, final: 94, total: 94.5, grade: 'A' },
        { id: 4, student: 'James Brown', course: 'Computer Science 101', midTerm: 65, final: 70, total: 67.5, grade: 'C' },
        { id: 5, student: 'Emily Davis', course: 'Computer Science 101', midTerm: 82, final: 88, total: 85, grade: 'B' },
        { id: 6, student: 'Daniel Wilson', course: 'Computer Science 101', midTerm: 45, final: 52, total: 48.5, grade: 'F' },
    ];

    const columns = [
        {
            key: 'student',
            header: 'Student Name',
            sortable: true,
            render: (row) => (
                <span className="font-medium text-slate-900 dark:text-white">{row.student}</span>
            ),
        },
        {
            key: 'course',
            header: 'Course',
            sortable: true,
        },
        {
            key: 'midTerm',
            header: 'Mid Term (40%)',
            sortable: true,
            render: (row) => (
                <div className="w-16 text-center bg-slate-100 dark:bg-dark-700 rounded py-1 text-sm">
                    {row.midTerm}
                </div>
            ),
        },
        {
            key: 'final',
            header: 'Final Exam (60%)',
            sortable: true,
            render: (row) => (
                <div className="w-16 text-center bg-slate-100 dark:bg-dark-700 rounded py-1 text-sm">
                    {row.final}
                </div>
            ),
        },
        {
            key: 'total',
            header: 'Total Score',
            sortable: true,
            render: (row) => <span className="font-bold">{row.total}</span>,
        },
        {
            key: 'grade',
            header: 'Grade',
            sortable: true,
            render: (row) => {
                const colors = {
                    'A': 'bg-green-100 text-green-700 border-green-200',
                    'B': 'bg-blue-100 text-blue-700 border-blue-200',
                    'C': 'bg-yellow-100 text-yellow-700 border-yellow-200',
                    'D': 'bg-orange-100 text-orange-700 border-orange-200',
                    'F': 'bg-red-100 text-red-700 border-red-200',
                };
                return (
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold border ${colors[row.grade.charAt(0)]}`}>
                        {row.grade}
                    </span>
                );
            },
        },
        {
            key: 'actions',
            header: 'Actions',
            render: () => (
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Edit
                </button>
            ),
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-header">Grades Management</h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Record and monitor student performance
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="btn-secondary flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Generate Report
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="card p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 min-w-[200px]">
                        <label className="label-text text-xs uppercase text-slate-500">Course</label>
                        <div className="relative">
                            <select className="input-field appearance-none">
                                <option>Computer Science 101</option>
                                <option>Mathematics 201</option>
                                <option>Physics 102</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="label-text text-xs uppercase text-slate-500">Semester</label>
                        <div className="relative">
                            <select className="input-field appearance-none">
                                <option>Fall 2024</option>
                                <option>Spring 2025</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="label-text text-xs uppercase text-slate-500">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search students..." className="input-field pl-10" />
                        </div>
                    </div>
                </div>

                <DataTable columns={columns} data={grades} />
            </div>
        </div>
    );
};

export default Grades;
