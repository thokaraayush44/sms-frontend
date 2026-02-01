import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Mail, Phone } from 'lucide-react';
import DataTable from '../components/tables/DataTable';
import Modal from '../components/Common/Modal';
import StudentForm from '../components/forms/StudentForm';
import Alert from '../components/Common/Alert';
import { useStudentStore } from '../context/store';
import studentsAPI from '../api/studentsAPI';
import { formatDate, capitalize } from '../utils/helpers';

const Students = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [alert, setAlert] = useState(null);
  const { students, setStudents, addStudent, updateStudent, deleteStudent } = useStudentStore();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Simulating API call with mock data
      // In production: const response = await studentsAPI.getAll();
      const mockStudents = [
        {
          id: 1,
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.j@university.edu',
          phone: '+1 (555) 123-4567',
          dateOfBirth: '2002-05-15',
          gender: 'female',
          address: '123 Main St, New York, NY 10001',
          enrollmentDate: '2023-09-01',
          status: 'active',
        },
        {
          id: 2,
          firstName: 'Michael',
          lastName: 'Chen',
          email: 'michael.c@university.edu',
          phone: '+1 (555) 234-5678',
          dateOfBirth: '2001-08-22',
          gender: 'male',
          address: '456 Oak Ave, San Francisco, CA 94102',
          enrollmentDate: '2023-09-01',
          status: 'active',
        },
        {
          id: 3,
          firstName: 'Emma',
          lastName: 'Williams',
          email: 'emma.w@university.edu',
          phone: '+1 (555) 345-6789',
          dateOfBirth: '2002-11-30',
          gender: 'female',
          address: '789 Pine Rd, Chicago, IL 60601',
          enrollmentDate: '2024-01-15',
          status: 'active',
        },
        {
          id: 4,
          firstName: 'James',
          lastName: 'Brown',
          email: 'james.b@university.edu',
          phone: '+1 (555) 456-7890',
          dateOfBirth: '2001-03-18',
          gender: 'male',
          address: '321 Elm St, Boston, MA 02101',
          enrollmentDate: '2023-09-01',
          status: 'inactive',
        },
      ];
      setStudents(mockStudents);
    } catch (error) {
      showAlert('error', 'Failed to fetch students');
    }
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        // In production: await studentsAPI.delete(studentId);
        deleteStudent(studentId);
        showAlert('success', 'Student deleted successfully');
      } catch (error) {
        showAlert('error', 'Failed to delete student');
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedStudent) {
        // In production: await studentsAPI.update(selectedStudent.id, data);
        updateStudent(selectedStudent.id, data);
        showAlert('success', 'Student updated successfully');
      } else {
        // In production: const response = await studentsAPI.create(data);
        const newStudent = { ...data, id: Date.now() };
        addStudent(newStudent);
        showAlert('success', 'Student added successfully');
      }
      setModalOpen(false);
    } catch (error) {
      showAlert('error', selectedStudent ? 'Failed to update student' : 'Failed to add student');
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      accessor: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {row.firstName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {row.firstName} {row.lastName}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              ID: {row.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Contact',
      accessor: (row) => row.email,
      sortable: true,
      render: (row) => (
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white mb-1">
            <Mail className="w-4 h-4 text-slate-400" />
            {row.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Phone className="w-4 h-4 text-slate-400" />
            {row.phone}
          </div>
        </div>
      ),
    },
    {
      key: 'enrollmentDate',
      header: 'Enrollment Date',
      accessor: (row) => row.enrollmentDate,
      sortable: true,
      render: (row) => (
        <span className="text-sm text-slate-900 dark:text-white">
          {formatDate(row.enrollmentDate)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => row.status,
      sortable: true,
      render: (row) => (
        <span className={`badge badge-${row.status === 'active' ? 'success' : 'danger'}`}>
          {capitalize(row.status)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      accessor: () => '',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditStudent(row);
            }}
            className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteStudent(row.id);
            }}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert */}
      {alert && (
        <div className="fixed top-20 right-4 z-50 max-w-md">
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Students</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage student records and enrollment
          </p>
        </div>
        <button onClick={handleAddStudent} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Total Students
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {students.length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Active
              </p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {students.filter(s => s.status === 'active').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Inactive
              </p>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                {students.filter(s => s.status !== 'active').length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card p-6">
        <DataTable columns={columns} data={students} searchable filterable />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
        size="lg"
      >
        <StudentForm
          student={selectedStudent}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Students;