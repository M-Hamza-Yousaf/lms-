import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/auth/Login/Login.jsx';
import Signup from '../pages/auth/Signup/Signup.jsx';
import StudentDashboard from '../pages/student/Dashboard/Dashboard.jsx';
import StudentCourses from '../pages/student/Courses/Courses.jsx';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/courses" element={<StudentCourses />} />
    </Routes>
  );
}

export default AppRoutes;