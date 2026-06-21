const express = require('express');
const router = express.Router();
const {
  createAssignment,
  getAllAssignments,
  getMyAssignments,
  submitAssignment,
  gradeSubmission,
  getAllSubmissions,
  getMyGrades
} = require('../controllers/assignmentController');
const { protect, teacherOnly } = require('../middleware/authMiddleware');

// Teacher routes
router.post('/', protect, teacherOnly, createAssignment);
router.get('/my-assignments', protect, teacherOnly, getMyAssignments);
router.get('/submissions', protect, teacherOnly, getAllSubmissions);
router.put('/:assignmentId/grade/:submissionId', protect, teacherOnly, gradeSubmission);

// Student routes
router.get('/', protect, getAllAssignments);
router.post('/:id/submit', protect, submitAssignment);
router.get('/my-grades', protect, getMyGrades);

module.exports = router;