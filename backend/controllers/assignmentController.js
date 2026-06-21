const Assignment = require('../models/Assignment');
const Course = require('../models/Course');

// CREATE ASSIGNMENT (Teacher)
const createAssignment = async (req, res) => {
  try {
    const { title, description, courseId, dueDate, maxMarks } = req.body;

    if (!title || !description || !courseId || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const assignment = await Assignment.create({
      title,
      description,
      course: courseId,
      courseName: course.title,
      teacher: req.user._id,
      teacherName: req.user.fullName,
      dueDate,
      maxMarks: maxMarks || 100
    });

    res.status(201).json({
      success: true,
      message: 'Assignment created successfully',
      assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GET ALL ASSIGNMENTS (For Students)
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// GET MY ASSIGNMENTS (Teacher's Own)
const getMyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ teacher: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// SUBMIT ASSIGNMENT (Student)
const submitAssignment = async (req, res) => {
  try {
    const { answerText } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    const alreadySubmitted = assignment.submissions.find(
      s => s.student.toString() === req.user._id.toString()
    );

    if (alreadySubmitted) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted this assignment'
      });
    }

    assignment.submissions.push({
      student: req.user._id,
      studentName: req.user.fullName,
      answerText: answerText || 'Submitted',
      status: 'submitted'
    });

    await assignment.save();

    res.status(200).json({
      success: true,
      message: 'Assignment submitted successfully',
      assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GRADE SUBMISSION (Teacher)
const gradeSubmission = async (req, res) => {
  try {
    const { marks, feedback } = req.body;
    const { assignmentId, submissionId } = req.params;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    const submission = assignment.submissions.id(submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    submission.marks = marks;
    submission.feedback = feedback || '';
    submission.status = 'graded';

    await assignment.save();

    res.status(200).json({
      success: true,
      message: 'Graded successfully',
      assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// GET ALL SUBMISSIONS (Teacher)
const getAllSubmissions = async (req, res) => {
  try {
    const assignments = await Assignment.find({ teacher: req.user._id });
    
    const allSubmissions = [];
    assignments.forEach(assignment => {
      assignment.submissions.forEach(submission => {
        allSubmissions.push({
          _id: submission._id,
          assignmentId: assignment._id,
          assignmentTitle: assignment.title,
          courseName: assignment.courseName,
          studentName: submission.studentName,
          submittedAt: submission.submittedAt,
          answerText: submission.answerText,
          marks: submission.marks,
          maxMarks: assignment.maxMarks,
          feedback: submission.feedback,
          status: submission.status
        });
      });
    });

    res.status(200).json({
      success: true,
      submissions: allSubmissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// GET MY GRADES (Student)
const getMyGrades = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    
    const myGrades = [];
    assignments.forEach(assignment => {
      const mySubmission = assignment.submissions.find(
        s => s.student.toString() === req.user._id.toString()
      );
      
      if (mySubmission) {
        myGrades.push({
          assignmentTitle: assignment.title,
          courseName: assignment.courseName,
          marks: mySubmission.marks,
          maxMarks: assignment.maxMarks,
          status: mySubmission.status,
          feedback: mySubmission.feedback,
          submittedAt: mySubmission.submittedAt
        });
      }
    });

    res.status(200).json({
      success: true,
      grades: myGrades
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getMyAssignments,
  submitAssignment,
  gradeSubmission,
  getAllSubmissions,
  getMyGrades
};