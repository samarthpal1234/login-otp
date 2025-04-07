import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Signup from './component/Signup';
import Otp from './component/Otp';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Otp" element={<Otp />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
