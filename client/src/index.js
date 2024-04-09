import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Login from './components/Login';
import Signup from './components/Signup';
import App from './App'; 

const RootComponent = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    
    </BrowserRouter>
    
  );
};

ReactDOM.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
