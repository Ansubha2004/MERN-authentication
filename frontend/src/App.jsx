import React,{useState} from 'react'
import './App.css'
import {Routes,Route,Navigate} from 'react-router-dom'
import Register from '../src/pages/register.jsx'
import Login from '../src/pages/login.jsx'
import Home from "../src/pages/home.jsx"
import Refreshhandler from "../src/hooks/refreshhandler.jsx"


function App() {

  const [checklogin,setchecklogin]=useState(false);

  const ProtectedRoute=({element})=>{
    return (checklogin)?element:<Navigate to="/login" />
  }
 

  return (
    <>
      <Refreshhandler isauthenticated={setchecklogin}/>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </>
  )
}

export default App
