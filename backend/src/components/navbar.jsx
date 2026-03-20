import React from 'react';
import './navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-title">Student Management System</h2>
        <div className="navbar-right">
          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <span className="login-text">Please login to continue</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;