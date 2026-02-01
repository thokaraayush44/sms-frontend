# Student Management System (SMS) Frontend

A modern, responsive, and feature-rich Student Management System built with React, Vite, and Tailwind CSS.

## 🎯 Features

### Core Functionality
- **Authentication**: Secure login/logout with JWT tokens
- **Dashboard**: Real-time analytics and statistics
- **Student Management**: Full CRUD operations for student records
- **Course Management**: Create, edit, and manage courses
- **Reports & Analytics**: Visual charts and data insights
- **Attendance Tracking**: Monitor student attendance
- **Grade Management**: Track and manage student grades
- **Responsive Design**: Mobile-first approach, works on all devices
- **Dark Mode**: Toggle between light and dark themes

### User Interface
- Modern, clean design with gradient accents
- Smooth animations and transitions
- Interactive charts using Recharts
- Searchable and sortable data tables
- Form validation with helpful error messages
- Toast notifications for user actions
- Modal dialogs for forms

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Navigate to the project directory**
   ```bash
   cd sms-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Credentials
```
Email: admin@edumanage.com
Password: password123
```

## 📁 Project Structure

```
sms-frontend/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Alert.jsx
│   │   │   └── Loading.jsx
│   │   ├── forms/           # Form components
│   │   │   ├── StudentForm.jsx
│   │   │   └── CourseForm.jsx
│   │   ├── tables/          # Table components
│   │   │   └── DataTable.jsx
│   │   └── charts/          # Chart components
│   │       ├── StatCard.jsx
│   │       └── StudentChart.jsx
│   ├── pages/               # Application pages
│   │   ├── Dashboard.jsx
│   │   ├── Students.jsx
│   │   ├── Courses.jsx
│   │   └── Login.jsx
│   ├── context/             # State management
│   │   └── store.js         # Zustand stores
│   ├── services/            # API services
│   │   └── api.js
│   ├── utils/               # Utility functions
│   │   └── helpers.js
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design System

### Colors
- **Primary**: Blue shades for main actions and branding
- **Accent**: Red for warnings and important actions
- **Success**: Green for positive feedback
- **Warning**: Yellow for cautionary messages
- **Dark**: Dark mode color palette

### Typography
- **Display Font**: Sora - Used for headings and titles
- **Body Font**: Outfit - Used for body text
- **Mono Font**: JetBrains Mono - Used for code and data

### Components
All components follow a consistent design pattern with:
- Rounded corners (xl: 12px, 2xl: 16px)
- Soft shadows with hover effects
- Smooth transitions (200-300ms)
- Gradient accents for visual interest
- Glass-morphism effects for overlays

## 🛠️ Technology Stack

### Core
- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Zustand**: State management

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Additional styles and animations

### Forms & Validation
- **React Hook Form**: Form management
- **Yup**: Schema validation

### Data Visualization
- **Recharts**: Charts and graphs

### Icons
- **Lucide React**: Modern icon library

### HTTP Client
- **Axios**: API requests

### Utilities
- **date-fns**: Date manipulation

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Tailwind Configuration
The `tailwind.config.js` includes:
- Custom color palette
- Extended font families
- Custom animations
- Dark mode support

### Vite Configuration
Fast HMR (Hot Module Replacement) configured in `vite.config.js`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Features:
- Collapsible sidebar on mobile
- Responsive tables with horizontal scroll
- Optimized touch targets
- Mobile-friendly forms

## 🎭 Key Features Explained

### Authentication
- Protected routes requiring login
- JWT token storage in localStorage
- Automatic redirect on logout
- Session persistence

### State Management
Uses Zustand with separate stores for:
- Authentication state
- UI preferences (theme, sidebar)
- Student data
- Course data

### Data Tables
Features include:
- Sorting by columns
- Search/filter functionality
- Pagination
- Responsive design
- Custom cell rendering

### Forms
All forms include:
- Field validation
- Error messages
- Loading states
- Success/error feedback
- Accessible labels

### Charts & Analytics
- Line charts for trends
- Area charts for distributions
- Bar charts for comparisons
- Custom tooltips
- Responsive sizing

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 🔌 API Integration

To connect to a real backend:

1. Update the `VITE_API_BASE_URL` in `.env`
2. Replace mock data calls in components with actual API calls
3. Implement proper error handling
4. Add loading states

Example API integration in `src/services/api.js`:
```javascript
// Current (mock)
const mockStudents = [...];
setStudents(mockStudents);

// Production
const response = await studentsAPI.getAll();
setStudents(response.data);
```

## 🎯 Best Practices

### Code Organization
- Components are modular and reusable
- Business logic separated from UI
- Consistent naming conventions
- Proper prop validation

### Performance
- Code splitting with React.lazy (can be added)
- Optimized re-renders
- Debounced search inputs
- Efficient state updates

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support

## 🔐 Security

- No sensitive data in localStorage (except encrypted tokens)
- CSRF protection ready
- XSS prevention through React
- Input validation
- Secure password fields

## 📝 Future Enhancements

Potential features to add:
- [ ] Email notifications
- [ ] File upload for student documents
- [ ] Bulk operations (import/export CSV)
- [ ] Advanced filtering
- [ ] Calendar view for schedules
- [ ] Real-time updates with WebSockets
- [ ] Multi-language support
- [ ] Print-friendly reports
- [ ] Role-based permissions
- [ ] Audit logs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💡 Tips for Developers

### Debugging
- Use React Developer Tools
- Check browser console for errors
- Use Network tab to debug API calls
- Enable React strict mode warnings

### Customization
- Modify colors in `tailwind.config.js`
- Add new routes in `App.jsx`
- Create new pages in `src/pages/`
- Add new components in `src/components/`

### Testing
Consider adding:
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright or Cypress

## 📧 Support

For issues and questions, please create an issue in the repository.

---

Built with ❤️ using React, Vite, and Tailwind CSS