const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getMyCourses,
  getCourseById,
  createCourse,
  addLecture,
  deleteLecture,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getAllUsers,
  deleteUser
} = require('../controllers/courseController');
const { protect, adminOnly, teacherOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllCourses);
router.get('/my-courses', protect, teacherOnly, getMyCourses);

// Admin routes
router.get('/admin/users', protect, adminOnly, getAllUsers);
router.delete('/admin/users/:id', protect, adminOnly, deleteUser);

// Single course
router.get('/:id', getCourseById);

// Teacher routes
router.post('/', protect, teacherOnly, createCourse);
router.put('/:id', protect, teacherOnly, updateCourse);
router.delete('/:id', protect, deleteCourse);

// Lecture routes (NEW!)
router.post('/:id/lectures', protect, teacherOnly, addLecture);
router.delete('/:courseId/lectures/:lectureId', protect, teacherOnly, deleteLecture);

// Student route
router.post('/:id/enroll', protect, enrollCourse);

module.exports = router;