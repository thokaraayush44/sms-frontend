import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Save, X } from 'lucide-react';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[\d\s\-+()]+$/, 'Invalid phone number').required('Phone is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  enrollmentDate: yup.date().required('Enrollment date is required'),
  status: yup.string().required('Status is required'),
}).required();

const StudentForm = ({ student = null, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: student || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="label-text">First Name</label>
          <input
            type="text"
            {...register('firstName')}
            className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="label-text">Last Name</label>
          <input
            type="text"
            {...register('lastName')}
            className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label-text">Email</label>
          <input
            type="email"
            {...register('email')}
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            placeholder="student@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="label-text">Phone</label>
          <input
            type="tel"
            {...register('phone')}
            className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="label-text">Date of Birth</label>
          <input
            type="date"
            {...register('dateOfBirth')}
            className={`input-field ${errors.dateOfBirth ? 'border-red-500' : ''}`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="label-text">Gender</label>
          <select
            {...register('gender')}
            className={`input-field ${errors.gender ? 'border-red-500' : ''}`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Enrollment Date */}
        <div>
          <label className="label-text">Enrollment Date</label>
          <input
            type="date"
            {...register('enrollmentDate')}
            className={`input-field ${errors.enrollmentDate ? 'border-red-500' : ''}`}
          />
          {errors.enrollmentDate && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.enrollmentDate.message}
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
            <option value="suspended">Suspended</option>
            <option value="graduated">Graduated</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.status.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="label-text">Address</label>
        <textarea
          {...register('address')}
          rows={3}
          className={`input-field ${errors.address ? 'border-red-500' : ''}`}
          placeholder="Enter full address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.address.message}
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
          {isSubmitting ? 'Saving...' : student ? 'Update Student' : 'Add Student'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;