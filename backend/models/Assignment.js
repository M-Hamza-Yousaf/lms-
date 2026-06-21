const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacherName: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  maxMarks: {
    type: Number,
    default: 100
  },
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    studentName: String,
    submittedAt: {
      type: Date,
      default: Date.now
    },
    answerText: String,
    marks: {
      type: Number,
      default: null
    },
    feedback: String,
    status: {
      type: String,
      enum: ['submitted', 'graded'],
      default: 'submitted'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;