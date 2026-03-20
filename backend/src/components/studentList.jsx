import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import './studentList.css';

const API_URL = 'http://localhost:5000/api';

const StudentList = ({ auth }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all students
  useEffect(() => {
    if (auth?.token) {
      fetchStudents();
    }
  }, [auth]);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      const data = await response.json();
      if (data.success) {
        setStudents(data.data);
      }
    } catch (err) {
      setError(err.message || 'Error fetching students');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await fetch(`${API_URL}/students/${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      const data = await response.json();
      if (data.success) {
        setStudents(students.filter((s) => s.id !== studentId));
        alert('Student deleted successfully');
      }
    } catch (err) {
      alert(err.message || 'Error deleting student');
    }
  };

  const handleUpdate = async (studentId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/students/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(updatedData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      const data = await response.json();
      if (data.success) {
        setStudents(
          students.map((s) => (s.id === studentId ? data.data : s))
        );
        alert('Student updated successfully');
      }
    } catch (err) {
      alert(err.message || 'Error updating student');
    }
  };

  const handleAddStudent = async (newStudent) => {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(newStudent),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const data = await response.json();
      if (data.success) {
        setStudents([...students, data.data]);
        alert('Student added successfully');
      }
    } catch (err) {
      alert(err.message || 'Error adding student');
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!auth?.token) {
    return <div className="student-list-container">Please login to view students</div>;
  }

  return (
    <div className="student-list-container">
      <div className="list-header">
        <h3>Students List</h3>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading students...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="no-students">
          {searchTerm
            ? 'No students found matching your search'
            : 'No students added yet'}
        </div>
      ) : (
        <div className="students-grid">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      <div className="total-students">
        Total Students: <strong>{filteredStudents.length}</strong>
      </div>
    </div>
  );
};

export default StudentList;
