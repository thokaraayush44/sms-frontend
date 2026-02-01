import { format, parseISO, isValid } from 'date-fns';

// Date formatting utilities
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '-';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, formatStr) : '-';
  } catch {
    return '-';
  }
};

export const formatDateTime = (date) => formatDate(date, 'MMM dd, yyyy HH:mm');

// String utilities
export const truncate = (str, length = 50) => {
  if (!str) return '';
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Number formatting
export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  return new Intl.NumberFormat().format(num);
};

export const formatPercentage = (num, decimals = 1) => {
  if (typeof num !== 'number') return '0%';
  return `${num.toFixed(decimals)}%`;
};

// Validation helpers
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhone = (phone) => {
  const re = /^[\d\s\-+()]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Array utilities
export const sortByKey = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    
    if (typeof valA === 'string') {
      return order === 'asc' 
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    
    return order === 'asc' ? valA - valB : valB - valA;
  });
};

export const filterBySearch = (array, searchTerm, keys) => {
  if (!searchTerm) return array;
  
  const term = searchTerm.toLowerCase();
  return array.filter(item => 
    keys.some(key => {
      const value = getNestedValue(item, key);
      return value && value.toString().toLowerCase().includes(term);
    })
  );
};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Debounce function
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  },
};

// File utilities
export const downloadFile = (data, filename, type = 'text/csv') => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Status badge helper
export const getStatusColor = (status) => {
  const colors = {
    active: 'success',
    inactive: 'danger',
    pending: 'warning',
    completed: 'success',
    ongoing: 'info',
  };
  return colors[status?.toLowerCase()] || 'info';
};

// Generate random ID (for demo purposes)
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Calculate grade
export const calculateGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

// Get grade color
export const getGradeColor = (grade) => {
  const colors = {
    A: 'text-green-600 dark:text-green-400',
    B: 'text-blue-600 dark:text-blue-400',
    C: 'text-yellow-600 dark:text-yellow-400',
    D: 'text-orange-600 dark:text-orange-400',
    F: 'text-red-600 dark:text-red-400',
  };
  return colors[grade] || 'text-slate-600 dark:text-slate-400';
};