import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
  </nav>
);

function App() {
  return (
    <Container>
      <h1>Welcome to the App</h1>
      <Navigation />
      <Outlet />
    </Container>
  );
}

export default App;
