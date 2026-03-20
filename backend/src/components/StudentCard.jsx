import React, { useState } from 'react';
import './StudentCard.css';

const StudentCard = ({ student, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: student.name,
    email: student.email,
    rollNumber: student.rollNumber,
    className: student.className,
    marks: student.marks,
  });
  const [loading, setLoading] = useState(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onUpdate(student.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating student:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setLoading(true);
      try {
        await onDelete(student.id);
      } catch (error) {
        console.error('Error deleting student:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="student-card edit-mode">
        <h4>Edit Student</h4>
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleEditChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={editData.email}
            onChange={handleEditChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="rollNumber"
            value={editData.rollNumber}
            onChange={handleEditChange}
            placeholder="Roll Number"
          />
          <input
            type="text"
            name="className"
            value={editData.className}
            onChange={handleEditChange}
            placeholder="Class"
          />
          <input
            type="number"
            name="marks"
            value={editData.marks}
            onChange={handleEditChange}
            placeholder="Marks"
            min="0"
            max="100"
          />
          <div className="edit-buttons">
            <button
              onClick={handleSave}
              disabled={loading}
              className="save-btn"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-card">
      <div className="card-header">
        <h4>{student.name}</h4>
        <span className="roll-number">#{student.rollNumber}</span>
      </div>

      <div className="card-body">
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>Class:</strong> {student.className}
        </p>
        <p>
          <strong>Marks:</strong> {student.marks}
        </p>
        {student.createdAt && (
          <p className="timestamp">
            <strong>Added:</strong> {new Date(student.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="card-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="edit-btn"
          disabled={loading}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="delete-btn"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
