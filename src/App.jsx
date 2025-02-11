import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from './Components/Login'
import Register from './Components/Register'
import Admin from './Page/Admin'
import Emp from './Page/Emp'
import Home from './Components/Home';


function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
            <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/admin" element={<Admin/>} />
                  <Route path="/emp" element={<Emp/>} />
            </Routes>
        </Router>
    
  )
}

export default App
