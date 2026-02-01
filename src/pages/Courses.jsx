import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, BookOpen, Clock, Users } from 'lucide-react';
import DataTable from '../components/tables/DataTable';
import Modal from '../components/common/Modal';
import CourseForm from '../components/forms/CourseForm';
import Alert from '../components/common/Alert';
import { useCourseStore } from '../context/store';
import { capitalize } from '../utils/helpers';

const Courses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [alert, setAlert] = useState(null);
  const { courses, setCourses, addCourse, updateCourse, deleteCourse } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // Simulating API loading with mock data
      const mockCourses = [
        {
          id: 1,
          code: 'CS101',
          name: 'Introduction to Computer Science',
          instructor: 'Dr. Alan Smith',
          department: 'Computer Science',
          credits: 4,
          capacity: 50,
          enrolled: 45,
          semester: 'Fall 2024',
          status: 'active',
          description: 'Fundamental concepts of computing and programming.',
        },
        {
          id: 2,
          code: 'MATH201',
          name: 'Calculus II',
          instructor: 'Prof. Mary Johnson',
          department: 'Mathematics',
          credits: 3,
          capacity: 40,
          enrolled: 38,
          semester: 'Fall 2024',
          status: 'active',
          description: 'Integration techniques and applications.',
        },
        {
          id: 3,
          code: 'PHY102',
          name: 'Physics: Electromagnetism',
          instructor: 'Dr. Robert Brown',
          department: 'Physics',
          credits: 4,
          capacity: 35,
          enrolled: 30,
          semester: 'Spring 2025',
          status: 'active',
          description: 'Study of electric and magnetic fields.',
        },
        {
          id: 4,
          code: 'ENG101',
          name: 'English Composition',
          instructor: 'Prof. Sarah Davis',
          department: 'Humanities',
          credits: 3,
          capacity: 25,
          enrolled: 25,
          semester: 'Fall 2024',
          status: 'active',
          description: 'Academic writing and critical thinking.',
        },
      ];
      setCourses(mockCourses);
    } catch (error) {
      showAlert('error', 'Failed to fetch courses');
    }
  };

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        deleteCourse(courseId);
        showAlert('success', 'Course deleted successfully');
      } catch (error) {
        showAlert('error', 'Failed to delete course');
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedCourse) {
        updateCourse(selectedCourse.id, data);
        showAlert('success', 'Course updated successfully');
      } else {
        const newCourse = {
          ...data,
          id: Date.now(),
          enrolled: 0
        };
        addCourse(newCourse);
        showAlert('success', 'Course added successfully');
      }
      setModalOpen(false);
    } catch (error) {
      showAlert('error', selectedCourse ? 'Failed to update course' : 'Failed to add course');
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const columns = [
    {
      key: 'code',
      header: 'Code',
      accessor: (row) => row.code,
      sortable: true,
      render: (row) => (
        <span className="font-mono text-sm font-semibold text-primary-600 dark:text-primary-400">
          {row.code}
        </span>
      ),
    },
    {
      key: 'name',
      header: 'Course Name',
      accessor: (row) => row.name,
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {row.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
            {row.description}
          </p>
        </div>
      ),
    },
    {
      key: 'instructor',
      header: 'Instructor',
      accessor: (row) => row.instructor,
      sortable: true,
    },
    {
      key: 'credits',
      header: 'Credits',
      accessor: (row) => row.credits,
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
          <Clock className="w-4 h-4" />
          {row.credits}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => row.status,
      sortable: true,
      render: (row) => (
        <span className={`badge badge-${row.status === 'active' ? 'success' : 'secondary'}`}>
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
              handleEditCourse(row);
            }}
            className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteCourse(row.id);
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
          <h1 className="page-header">Courses</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage academic courses and curriculum
          </p>
        </div>
        <button onClick={handleAddCourse} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Total Courses
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {courses.length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Active Semesters
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                3
              </h3>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                Total Instructors
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                12
              </h3>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="card p-6">
        <DataTable columns={columns} data={courses} searchable filterable />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedCourse ? 'Edit Course' : 'Add New Course'}
        size="lg"
      >
        <CourseForm
          course={selectedCourse}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Courses;