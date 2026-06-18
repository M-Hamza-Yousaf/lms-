const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getAllUsers,
  deleteUser
} = require('../controllers/courseController');

const { protect, adminOnly, teacherOnly } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllCourses);

// Protected routes - Need login
router.get('/my-courses', protect, teacherOnly, getMyCourses);
router.post('/', protect, teacherOnly, createCourse);
router.put('/:id', protect, teacherOnly, updateCourse);
router.delete('/:id', protect, deleteCourse);
router.post('/:id/enroll', protect, enrollCourse);

// Admin routes
router.get('/admin/users', protect, adminOnly, getAllUsers);
router.delete('/admin/users/:id', protect, adminOnly, deleteUser);

module.exports = router;