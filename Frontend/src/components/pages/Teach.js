import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Teach.css';

function Teach() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/teacher-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message || 'Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setErrorMessage(result.message || 'Login failed. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred during signup. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="teach-page">
      <img src="/Background.png" alt="Background" className="background-image" />

      {errorMessage && (
        <div className="popup error show">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="popup success show">
          {successMessage}
        </div>
      )}

      <h1>Welcome to NiounKidTech</h1>
      <h2>Sign In as a Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email Address / Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/signup" className="cta-button">Create Account</Link>
    </div>
  );
}

export default Teach;
