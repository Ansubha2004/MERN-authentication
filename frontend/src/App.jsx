import React from 'react'
import './App.css'
import {Routes,Route,Navigate} from 'react-router-dom'
import Register from '../src/pages/register.jsx'
import Login from '../src/pages/login.jsx'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
