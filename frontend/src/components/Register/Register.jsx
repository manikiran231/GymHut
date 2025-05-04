import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [timePreference, setTimePreference] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://gymhut-backend.onrender.com/register", {
        name,
        email,
        phone,
        age,
        timePreference,
        username,
        password,
      });
  
      if (response.status === 201 && response.data.message === "User registered successfully") {
        console.log("Registration successful:", response.data.message);
        toast.success("Registration successful!", {
          autoClose: 2000,
          onClose: () => navigate("/login"),
        });
      } else {
        console.warn("Unexpected response:", response.data);
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMsg = error.response.data.error;
  
        if (status === 409) {
          if (errorMsg === "User already exists") {
            toast.error("An account with this email and username already exists.");
          } else if (errorMsg === "Username already taken") {
            toast.error("This username is already taken. Please choose another.");
          } else if (errorMsg === "Email already registered") {
            toast.error("This email is already registered. Please use another.");
          } else {
            toast.error(errorMsg || "An unknown error occurred.");
          }
          return; // STOP here — do NOT navigate!
        }
  
        console.error("Server error:", error.response.data.error || error.response.statusText);
        toast.error(error.response.data.error || "Server error occurred.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        toast.error("No response from server. Please check your network.");
      } else {
        console.error("Request error:", error.message);
        toast.error("Error in request: " + error.message);
      }
    }
  };
  

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <header>
        <p>Please enter your details</p>
        <h1>Register    </h1>
      </header>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <label htmlFor="phone">Phone number</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          required
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
        <label htmlFor="timePreference">Time preference</label>
        <input
          type="text"
          id="timePreference"
          value={timePreference}
          onChange={(e) => setTimePreference(e.target.value)}
          placeholder="Time preference"
          required
        />
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
        <button type="submit" className="register-button">Register</button>
        <div className="signup-link">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
