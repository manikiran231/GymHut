import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Forgot.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Forgot() {
  const [username, setusername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/forgot-password', { username });
      setMessage(response.data.message || 'Check your email for reset instructions.');
      toast.success("OTP sent to your email!");
        setTimeout(() => {
          navigate(`/reset-password/${username}`);
      }, 2000);
      setError('');
    } catch (err) {
      console.error('Forgot password error:', err);
      setMessage('');
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="forgot-container">
      <header>
        <p>Enter your username to reset your password</p>
        <h1>Forgot Password</h1>
      </header>
      <form onSubmit={handleSubmit}>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="userName"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit" className="forgot-button">Send Passcode</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Forgot;
