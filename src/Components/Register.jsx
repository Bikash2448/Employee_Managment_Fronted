import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../src/App.css'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    // Mobile number validation (10 digits)
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Mobile number must be exactly 10 digits!", { position: "top-right" });
      setLoading(false);
      return; // Stop form submission
    }
  

    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`,{
        "name":name,
        "role":selectedRole,
        "mobile":mobile,
        "email":email,
        "password":password
      })
      console.log("Data send DB",response)
      setLoading(false)
      toast.success("Registration successful! Redirecting to login...", { position: "top-right" });
      navigate('/login')
    }catch(e){
      console.log("Data Does not send",e);
      toast.error("Registration failed. Try again!", { position: "top-right" });
    }
    setEmail('')
    setMobile('')
    setPassword('')
    setName('')
    setSelectedRole('')
  };

  return (
    <div className="flex justify-center bg-sky-900 items-center min-h-screen back ">
      <div className="con  bg-transparent p-8 rounded-lg shadow-lg w-full sm:w-96 animate__animated animate__fadeIn animate__delay-1s">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <select
                id="role-dropdown"
                value={selectedRole}
                onChange={(e)=>setSelectedRole(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value="" disabled>
                  -- Choose Role --
                </option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
          </div>
          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Mobile Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 bg-blue-600 text-white rounded-md focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Register'}
          </button>
        </form>
        <div className='flex justify-evenly m-4 '>
        <p className='pr-4 '>Already have an account? <Link to="/login" className='text-white text-l pl-2'>Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
