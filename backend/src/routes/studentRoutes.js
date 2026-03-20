const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

// All student routes are protected by authMiddleware
router.use(authMiddleware);

// Get all students
router.get('/', getAllStudents);

// Get student by ID
router.get('/:id', getStudentById);

// Create new student
router.post('/', createStudent);

// Update student
router.put('/:id', updateStudent);

// Delete student
router.delete('/:id', deleteStudent);

module.exports = router;
