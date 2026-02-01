import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Save, X } from 'lucide-react';

const schema = yup.object({
  name: yup.string().required('Course name is required'),
  code: yup.string().required('Course code is required'),
  description: yup.string().required('Description is required'),
  credits: yup.number().positive('Credits must be positive').required('Credits is required'),
  instructor: yup.string().required('Instructor is required'),
  department: yup.string().required('Department is required'),
  semester: yup.string().required('Semester is required'),
  capacity: yup.number().positive('Capacity must be positive').required('Capacity is required'),
  status: yup.string().required('Status is required'),
}).required();

const CourseForm = ({ course = null, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: course || {
      name: '',
      code: '',
      description: '',
      credits: 3,
      instructor: '',
      department: '',
      semester: '',
      capacity: 30,
      status: 'active',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Name */}
        <div>
          <label className="label-text">Course Name</label>
          <input
            type="text"
            {...register('name')}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="e.g., Introduction to Computer Science"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Course Code */}
        <div>
          <label className="label-text">Course Code</label>
          <input
            type="text"
            {...register('code')}
            className={`input-field ${errors.code ? 'border-red-500' : ''}`}
            placeholder="e.g., CS101"
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.code.message}
            </p>
          )}
        </div>

        {/* Instructor */}
        <div>
          <label className="label-text">Instructor</label>
          <input
            type="text"
            {...register('instructor')}
            className={`input-field ${errors.instructor ? 'border-red-500' : ''}`}
            placeholder="Instructor name"
          />
          {errors.instructor && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.instructor.message}
            </p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="label-text">Department</label>
          <select
            {...register('department')}
            className={`input-field ${errors.department ? 'border-red-500' : ''}`}
          >
            <option value="">Select department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.department.message}
            </p>
          )}
        </div>

        {/* Credits */}
        <div>
          <label className="label-text">Credits</label>
          <input
            type="number"
            {...register('credits')}
            className={`input-field ${errors.credits ? 'border-red-500' : ''}`}
            min="1"
            max="10"
          />
          {errors.credits && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.credits.message}
            </p>
          )}
        </div>

        {/* Capacity */}
        <div>
          <label className="label-text">Capacity</label>
          <input
            type="number"
            {...register('capacity')}
            className={`input-field ${errors.capacity ? 'border-red-500' : ''}`}
            min="1"
          />
          {errors.capacity && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.capacity.message}
            </p>
          )}
        </div>

        {/* Semester */}
        <div>
          <label className="label-text">Semester</label>
          <select
            {...register('semester')}
            className={`input-field ${errors.semester ? 'border-red-500' : ''}`}
          >
            <option value="">Select semester</option>
            <option value="Fall 2024">Fall 2024</option>
            <option value="Spring 2025">Spring 2025</option>
            <option value="Summer 2025">Summer 2025</option>
            <option value="Fall 2025">Fall 2025</option>
          </select>
          {errors.semester && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.semester.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="label-text">Status</label>
          <select
            {...register('status')}
            className={`input-field ${errors.status ? 'border-red-500' : ''}`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="label-text">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className={`input-field ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Enter course description..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-dark-700">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : course ? 'Update Course' : 'Add Course'}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;