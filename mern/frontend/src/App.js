import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Notes from './componets/Notes';
import Feedback from './componets/Feedback';
import Note from './componets/Note';
import Register from './componets/Register';
import Login from './componets/Login';
import Navbar from './componets/Navbar';
import Protectedroute from './componets/Protectedroute';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Protectedroute><Notes /></Protectedroute>} />
        <Route path="/feedback" element={<Protectedroute><Feedback /></Protectedroute>} />
        <Route path="/note/:id" element={<Protectedroute><Note /></Protectedroute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;