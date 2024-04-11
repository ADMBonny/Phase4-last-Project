import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignup) {
        await axios.post('http://localhost:5000/signup', formData);
        alert('Signup successful!');
      } else {
        await axios.post('http://localhost:5000/login', formData);
        alert('Login successful!');
      }
      // Clear form data after submission
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('Authentication failed:', error);
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Authentication failed. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Signup' : 'Login'}</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none" disabled={isLoading}>{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      <p className="mt-4 text-gray-700">{isSignup ? 'Already have an account? ' : 'Don\'t have an account? '}
        <button className="text-blue-500" onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Login' : 'Signup'}</button>
      </p>
    </div>
  );
};

export default AuthForm;
