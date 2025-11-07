import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'
import Nav from './components/Nav.jsx'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext.jsx'


function App() {
  let {userData} = useContext(userDataContext);
  return (
    <>
    <Nav />
      <Routes>
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App