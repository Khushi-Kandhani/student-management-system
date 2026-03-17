interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
}

export default Student;

// In-memory database
let students: Student[] = [];

// Get all students
export const getStudents = (): Student[] => {
  console.log(`Fetching all students, total: ${students.length}`);
  return students;
};

// Add new student
export const addStudent = (student: Student): void => {
  students.push(student);
  console.log(`Student added: ${student.name}`);
};

// Get student by ID
export const getStudentById = (id: string): Student | undefined => {
  const student = students.find(student => student.id === id);
  if (student) console.log(`Student retrieved: ${student.name}`);
  else console.log(`Student not found with ID: ${id}`);
  return student;
};

// Update student by ID
export const updateStudent = (id: string, updatedStudent: Partial<Student>): void => {
  const student = students.find(student => student.id === id);
  if (student) {
    Object.assign(student, updatedStudent);
    console.log(`Student updated: ${student.name}`);
  } else {
    console.log(`Student not found with ID: ${id}`);
  }
};

// Delete student by ID
export const deleteStudent = (id: string): void => {
  const lengthBefore = students.length;
  students = students.filter(student => student.id !== id);
  if (students.length < lengthBefore) console.log(`Student deleted: ${id}`);
  else console.log(`Student not found with ID: ${id}`);
};