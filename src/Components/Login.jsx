import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const onSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    setUser(decodedToken);
  };

  const onError = () => {
    console.log('Login Failed');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("log handle login")

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        email,
        password
      });

      const { user, accessToken } = response.data;
      console.log(user,accessToken)

      // Store access token in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate based on role
      if (user.role === 'admin') {
        navigate('/admin', { state: { name: user.name, id: user._id } });
      } else if (user.role === 'employee') {
        navigate('/emp', { state: { name: user.name, id: user._id } });
      } else {
        alert('Unknown role!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex justify-center bg-sky-900 back items-center min-h-screen animate-fadeIn">
      <div className="bg-transparent con p-8 rounded-lg shadow-lg w-full max-w-sm transform transition-all duration-500 ease-in-out animate-slideIn">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-200 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <h3 className='w-full p-3 text-white text-center'>OR</h3>
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onError}
              useOneTap
              className="text-center w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
