import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    set({ user: userData, token, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  updateUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData });
  },
}));

export const useUIStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'light',
  sidebarOpen: true,
  
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    return { theme: newTheme };
  }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

export const useStudentStore = create((set) => ({
  students: [],
  loading: false,
  error: null,
  
  setStudents: (students) => set({ students }),
  
  addStudent: (student) => set((state) => ({
    students: [...state.students, student]
  })),
  
  updateStudent: (id, updatedStudent) => set((state) => ({
    students: state.students.map((s) => 
      s.id === id ? { ...s, ...updatedStudent } : s
    )
  })),
  
  deleteStudent: (id) => set((state) => ({
    students: state.students.filter((s) => s.id !== id)
  })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));

export const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,
  
  setCourses: (courses) => set({ courses }),
  
  addCourse: (course) => set((state) => ({
    courses: [...state.courses, course]
  })),
  
  updateCourse: (id, updatedCourse) => set((state) => ({
    courses: state.courses.map((c) => 
      c.id === id ? { ...c, ...updatedCourse } : c
    )
  })),
  
  deleteCourse: (id) => set((state) => ({
    courses: state.courses.filter((c) => c.id !== id)
  })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));