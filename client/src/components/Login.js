import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';


import AuthService from './AuthService';
import './Login.css'; 
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await AuthService.login(username, password);
      window.location.reload();
    } catch (error) {
      setMessage(error.toString());
    }
  };;

  return (
    <Container className="login-container">
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="success" type="submit">Login</Button>
      </Form>
      {message && <Alert variant="danger">{message}</Alert>}
    </Container>
  );
};

export default Login;
