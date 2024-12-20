import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useAuthStore } from './store/authStore';

// Lazy load pages
const Landing = React.lazy(() => import('./pages/Landing'));
const About = React.lazy(() => import('./pages/landing/About'));
const Team = React.lazy(() => import('./pages/landing/Team'));
const Contact = React.lazy(() => import('./pages/landing/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const RegisterSuccess = React.lazy(() => import('./pages/auth/RegisterSuccess'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const TeacherDashboard = React.lazy(() => import('./pages/teacher/Dashboard'));
const StudentDashboard = React.lazy(() => import('./pages/student/Dashboard'));
const CourseCreator = React.lazy(() => import('./pages/teacher/CourseCreator'));
const CourseView = React.lazy(() => import('./pages/CourseView'));
const Profile = React.lazy(() => import('./pages/Profile'));
const TaskView = React.lazy(() => import('./pages/TaskView'));
const PendingApprovals = React.lazy(() => import('./pages/admin/PendingApprovals'));

// PrivateRoute component - ensures user is authenticated and has the required role
function PrivateRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'admin' | 'teacher' | 'student' }) {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return <Layout>{children}</Layout>;
}

// Main App component - handles routing and authentication
function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <React.Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      }>
        <Routes>
          {/* Public routes - accessible to all users */}
          {/* Authenticated users are redirected to their role-specific dashboard */}
          <Route path="/" element={user ? <Navigate to={`/${user.role}`} replace /> : <Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to={`/${user.role}`} replace /> : <Register />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin routes - only accessible to users with admin role */}
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRole="admin">
                <PendingApprovals />
              </PrivateRoute>
            }
          />

          {/* Teacher routes - only accessible to users with teacher role */}
          <Route
            path="/teacher"
            element={
              <PrivateRoute allowedRole="teacher">
                <TeacherDashboard />
              </PrivateRoute>
            }
          />

          {/* Teacher course creator route - only accessible to users with teacher role */}
          <Route
            path="/teacher/course/create"
            element={
              <PrivateRoute allowedRole="teacher">
                <CourseCreator />
              </PrivateRoute>
            }
          />

          {/* Student routes - only accessible to users with student role */}
          <Route
            path="/student"
            element={
              <PrivateRoute allowedRole="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />

          {/* Protected routes - accessible to any authenticated user */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Course view route - accessible to any authenticated user */}
          <Route
            path="/course/:id"
            element={
              <PrivateRoute>
                <CourseView />
              </PrivateRoute>
            }
          />

          {/* Task view route - accessible to any authenticated user */}
          <Route
            path="/course/:courseId/task/:taskId"
            element={
              <PrivateRoute>
                <TaskView />
              </PrivateRoute>
            }
          />

          {/* Catch all route - redirects unknown paths to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;