import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Forgot from './components/Forgot/Forgot'
import About from './components/About/About'
import Courses from './components/Courses/Courses'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Membership from './components/Membership/Membership'
import ResetPassword from './components/Reset/ResetPassword'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/reset-password/:username" element={<ResetPassword />} />
      </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
