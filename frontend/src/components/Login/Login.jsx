import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        username,
        password,
      });

      // Optional: Save token/user data to localStorage
      // localStorage.setItem("token", response.data.token);

      // Redirect to membership page
      navigate('/membership');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
    if (e.target.checked) {
      alert('We will remember for 30 days');
    }
  };

  return (
    <div className="login-container">
      <header>
        <p>Please enter your details</p>
        <h1>Welcome back</h1>
      </header>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="button" id="toggleButton" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={handleRememberChange}
            />{' '}
            Remember for 30 days
          </label>
          <Link to="/forgot">Forgot Password?</Link>
        </div>
        <button type="submit" className="login-button">Sign In</button>
        <div className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
