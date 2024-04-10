import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const formData = {
      username,
      email,
      password
    };
  
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      if (response.status === 201) {
        alert('User registered successfully');
        // Redirect or perform other actions upon successful signup
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    } catch (error) {
      if (error.response.status === 400 && error.response.data.error === "Email already registered") {
        alert('User already registered with this email');
      } else {
        alert('Signup failed. Please try again later.');
      }
    } finally {
      setIsLoading(false);
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
