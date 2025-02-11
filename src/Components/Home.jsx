import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="flex flex-col bg-gradient-to-br from-gray-800 via-gray-900 to-black w-full h-screen text-white"
    >
      {/* Navbar Section */}
      <nav className="flex justify-between items-center px-10 py-4 shadow-lg bg-gray-900 bg-opacity-80">
        <h1 className="text-3xl font-bold text-blue-400">EmpowerHR</h1>
        <div>
          <Link
            to="/register"
            className="py-2 px-6 mx-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-sm font-semibold"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="py-2 px-6 mx-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-sm font-semibold"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Welcome to <span className="text-blue-400">EmpowerHR</span>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-gray-300">
            Streamline your employee management with cutting-edge tools designed for seamless operations, 
            real-time tracking, and empowering collaboration.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <Link
              to="/register"
              className="py-3 px-8 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="py-3 px-8 rounded-xl border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 text-lg font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="text-center py-4 bg-gray-900 bg-opacity-80">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} EmpowerHR. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
