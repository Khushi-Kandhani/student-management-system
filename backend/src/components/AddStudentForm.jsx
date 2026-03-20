import React, { useState } from 'react';
import './AddStudentForm.css';

const AddStudentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNumber: '',
    className: '',
    marks: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.rollNumber ||
        !formData.className
      ) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      await onSubmit(formData);

      // Reset form
      setFormData({
        name: '',
        email: '',
        rollNumber: '',
        className: '',
        marks: '',
      });
    } catch (err) {
      setError(err.message || 'Error adding student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-form">
      <h3>Add New Student</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number *</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="Enter roll number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="className">Class *</label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="Enter class name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="marks">Marks</label>
          <input
            type="number"
            id="marks"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Enter marks (optional)"
            min="0"
            max="100"
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default AddStudentForm;
