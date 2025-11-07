import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'
import "./index.css"; //

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App