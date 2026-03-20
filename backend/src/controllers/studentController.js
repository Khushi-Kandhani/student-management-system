// Mock database for students (replace with actual database)
let students = [];
let studentIdCounter = 1;

// Get all students
const getAllStudents = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      count: students.length,
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message,
    });
  }
};

// Get student by ID
const getStudentById = (req, res) => {
  try {
    const { id } = req.params;

    const student = students.find((s) => s.id === parseInt(id));

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Student found',
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message,
    });
  }
};

// Create new student
const createStudent = (req, res) => {
  try {
    const { name, email, rollNumber, className, marks } = req.body;

    // Validation
    if (!name || !email || !rollNumber || !className) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if student email already exists
    const emailExists = students.some((s) => s.email === email);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists',
      });
    }

    // Create new student
    const newStudent = {
      id: studentIdCounter++,
      name,
      email,
      rollNumber,
      className,
      marks: marks || 0,
      createdAt: new Date(),
      createdBy: req.user?.id || 'unknown',
    };

    students.push(newStudent);

    return res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message,
    });
  }
};

// Update student
const updateStudent = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, rollNumber, className, marks } = req.body;

    const studentIndex = students.findIndex((s) => s.id === parseInt(id));

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Update student
    students[studentIndex] = {
      ...students[studentIndex],
      name: name || students[studentIndex].name,
      email: email || students[studentIndex].email,
      rollNumber: rollNumber || students[studentIndex].rollNumber,
      className: className || students[studentIndex].className,
      marks: marks !== undefined ? marks : students[studentIndex].marks,
      updatedAt: new Date(),
      updatedBy: req.user?.id || 'unknown',
    };

    return res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: students[studentIndex],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message,
    });
  }
};

// Delete student
const deleteStudent = (req, res) => {
  try {
    const { id } = req.params;

    const studentIndex = students.findIndex((s) => s.id === parseInt(id));

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
