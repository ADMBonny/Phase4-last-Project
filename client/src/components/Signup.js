import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import AuthService from './AuthService';
import './Signup.css'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await AuthService.register(username, email, password);
      setMessage('Successful signup. Please log in.');
    } catch (error) {
      setMessage(error.toString());
    }
  };

  return (
    <Container className="signup-container">
      <Form onSubmit={handleSignup}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Sign Up</Button>
      </Form>
      {message && <Alert variant="danger">{message}</Alert>}
    </Container>
  );
};

export default Signup;
