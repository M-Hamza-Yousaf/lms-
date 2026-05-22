import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Login from '../pages/auth/Login/Login.jsx';
import Signup from '../pages/auth/Signup/Signup.jsx';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard/Dashboard.jsx';
import StudentCourses from '../pages/student/Courses/Courses.jsx';
import LectureView from '../pages/student/LectureView/LectureView.jsx';
import StudentAssignments from '../pages/student/Assignments/Assignments.jsx';
import StudentGrades from '../pages/student/Grades/Grades.jsx';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/Dashboard/Dashboard.jsx';
import TeacherMyCourses from '../pages/teacher/MyCourses/MyCourses.jsx';
import TeacherAddLecture from '../pages/teacher/AddLecture/AddLecture.jsx';
import TeacherGradeStudents from '../pages/teacher/GradeStudents/GradeStudents.jsx';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard/Dashboard.jsx';
import AdminManageUsers from '../pages/admin/ManageUsers/ManageUsers.jsx';
import AdminManageCourses from '../pages/admin/ManageCourses/ManageCourses.jsx';

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
      <Route path="/student/lecture-view" element={<LectureView />} />
      <Route path="/student/assignments" element={<StudentAssignments />} />
      <Route path="/student/grades" element={<StudentGrades />} />

      {/* Teacher Routes */}
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher/courses" element={<TeacherMyCourses />} />
      <Route path="/teacher/add-lecture" element={<TeacherAddLecture />} />
      <Route path="/teacher/grade-students" element={<TeacherGradeStudents />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/manage-users" element={<AdminManageUsers />} />
      <Route path="/admin/manage-courses" element={<AdminManageCourses />} />
    </Routes>
  );
}

export default AppRoutes;