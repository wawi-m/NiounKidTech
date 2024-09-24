import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // Unified message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Reset message

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, username, password }),
      });

      const result = await response.json();
      console.log('Response status:', response.status);
      console.log('Result:', result);

      if (response.ok) {
        setMessage({ text: result.message || 'Login successful! Redirecting...', type: 'success' });
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setMessage({ text: result.message || 'Login failed. Please try again.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred during login. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="login-page">
      <img src="/LoginBackground.png" alt="Background" className="background-image" />

      {message.text && (
        <div className={`popup ${message.type} show`}>
          {message.text}
        </div>
      )}

      <div className="login-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">I am a:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="" disabled>Select your role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have a profile? <Link to="/signup" className="cta-button">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
