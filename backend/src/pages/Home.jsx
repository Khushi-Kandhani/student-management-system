import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Login from '../components/Login';
import AddStudentForm from '../components/AddStudentForm';
import StudentList from '../components/studentList';
import './Home.css';

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUser(data.user);
            setAuth({ token });
          }
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = ({ user: userData, token }) => {
    localStorage.setItem('token', token);
    setUser(userData);
    setAuth({ token });
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setAuth(null);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(studentData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const data = await response.json();
      if (data.success) {
        alert('Student added successfully!');
        return true;
      }
    } catch (error) {
      alert(error.message || 'Error adding student');
      throw error;
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!user || !auth) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="home">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="main-content">
        <div className="container">
          <AddStudentForm onSubmit={handleAddStudent} />
          <StudentList auth={auth} />
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Student Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;