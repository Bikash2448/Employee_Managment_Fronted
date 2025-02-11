import React, { useContext, useEffect, useState } from 'react'
// import { Authcontext } from '../../Context/AuthProvider'
import axios from 'axios'

const AllTask = ({refresh}) => {

    const [employees, setEmployees] = useState([]);

  // Fetch task data for a specific user by userId
  async function getEmployeeTaskData(userId) {
    try {
      const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/tasks/emp/${userId}`);
      return response.data; // Returning the task data (newTask, inProgress, etc.)
    } catch (error) {
      console.error(`Error fetching task data for userId ${userId}:`, error);
      return null;
    }
  }

  // Fetch all employees and their task data
  async function getEmployees() {
    try {
      const usersResponse = await axios(`${import.meta.env.VITE_BACKEND_URL}/users`);
      const usersData = usersResponse.data;

      const employeesOnly = usersData.filter(user => user.role === 'employee');

      // Fetch task data for each user and update employees' state
      const employeesData = await Promise.all(employeesOnly.map(async (user) => {
        const taskData = await getEmployeeTaskData(user._id);
        return {
          userId: user._id,
          userName: taskData?.userName || user.name, // Use task data userName if available
          newTask: taskData?.newTask || 0,
          inProgress: taskData?.inProgress || 0,
          completed: taskData?.completed || 0,
          uncomplete: taskData?.uncomplete || 0,
          pending: taskData?.pending || 0,
        };
      }));

      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  }

  useEffect(() => {
    getEmployees(); // Fetch employee task data when component mounts
  }, [refresh]);
  return (
    <div className='p-5 rounded mt-5 bg-[#1c1c1c] h-80 '>
        <div className='bg-blue-800 mb-2 py-2 px-4 flex overflow-auto justify-between rounded'>
            <h2 className='w-1/5 text-white font-bold text-center'>Employee Name</h2>
            <h2 className='w-1/5 text-white font-bold text-center'>New Task</h2>
            <h2 className='w-1/5 text-white font-bold text-center'>Complete Task</h2>
            <h2 className='w-1/5 text-white font-bold text-center'>Active Task</h2>
            <h2 className='w-1/5 text-white font-bold text-center'>Delete Task</h2>
        </div>
        
        {employees.map((employee, i) => (
        <div key={i} className="bg-gray-400 mb-2 py-2 px-4 flex justify-between rounded">
          <h2 className="w-1/5 text-center">{employee.userName}</h2> {/* Display userName */}
          <h2 className="w-1/5 text-center text-sky-700">{employee.newTask}</h2>
          <h2 className="w-1/5 text-center text-green-700">{employee.completed}</h2>
          <h2 className="w-1/5 text-center text-yellow-700">{employee.inProgress}</h2>
          <h2 className="w-1/5 text-center text-red-700">{employee.uncomplete}</h2>
        </div>
      ))}
        
    </div>
  )
}

export default AllTask