const Course = require('../models/Course');
const User = require('../models/User');

// Get all courses (public)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get teacher's courses
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single course with lectures
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, duration, price, level, thumbnail } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description and category'
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      duration: duration || '4 weeks',
      price: price || 0,
      level: level || 'Beginner',
      thumbnail: thumbnail || 'https://via.placeholder.com/300x200?text=Course',
      teacher: req.user._id,
      teacherName: req.user.fullName,
      status: 'approved'
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ADD LECTURE TO COURSE (NEW!)
const addLecture = async (req, res) => {
  try {
    const { title, videoUrl, duration, description } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide lecture title and video URL'
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check ownership
    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add lectures to this course'
      });
    }

    // Add lecture to array
    course.lectures.push({
      title,
      videoUrl,
      duration: duration || '10 min',
      description: description || ''
    });

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture added successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// DELETE LECTURE FROM COURSE (NEW!)
const deleteLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check ownership
    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Remove lecture
    course.lectures = course.lectures.filter(
      lecture => lecture._id.toString() !== lectureId
    );

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture deleted successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Course updated',
      course: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    await course.deleteOne();

    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Enroll in course
const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Enrolled successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllCourses,
  getMyCourses,
  getCourseById,
  createCourse,
  addLecture,
  deleteLecture,
  updateCourse,
  deleteCourse,
  enrollCconst Course = require('../models/Course');
const User = require('../models/User');

// Get all courses (public)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get teacher's courses
const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get single course with lectures
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, duration, price, level, thumbnail } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description and category'
      });
    }

    const course = await Course.create({
      title,
      description,
      category,
      duration: duration || '4 weeks',
      price: price || 0,
      level: level || 'Beginner',
      thumbnail: thumbnail || 'https://via.placeholder.com/300x200?text=Course',
      teacher: req.user._id,
      teacherName: req.user.fullName,
      status: 'approved'
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ADD LECTURE TO COURSE (NEW!)
const addLecture = async (req, res) => {
  try {
    const { title, videoUrl, duration, description } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide lecture title and video URL'
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check ownership
    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add lectures to this course'
      });
    }

    // Add lecture to array
    course.lectures.push({
      title,
      videoUrl,
      duration: duration || '10 min',
      description: description || ''
    });

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture added successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// DELETE LECTURE FROM COURSE (NEW!)
const deleteLecture = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check ownership
    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Remove lecture
    course.lectures = course.lectures.filter(
      lecture => lecture._id.toString() !== lectureId
    );

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture deleted successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Course updated',
      course: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    await course.deleteOne();

    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Enroll in course
const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Enrolled successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
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
};ourse,
  getAllUsers, 
  deleteUser
};