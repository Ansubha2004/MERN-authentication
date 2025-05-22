import React from 'react'
import './App.css'
import {Routes,Route,Navigate} from 'react-router-dom'
import Register from '../src/pages/register.jsx'
import Login from '../src/pages/login.jsx'
import Home from "../src/pages/home.jsx"


function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
