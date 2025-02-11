import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const TaskListNumber = ({ triggerEffect, triggerBothEffects }) => {

    const location = useLocation();
    const { name, id } = location.state || {};

    const [taskCounts, setTaskCounts] = useState({
        newTask: 0,
        inProgress: 0,
        completed: 0,
        uncomplete: 0,
      });

      useEffect(() => {
        const fetchTaskCounts = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tasks/emp/${id}`);
            setTaskCounts(response.data);
            triggerBothEffects()
          } catch (error) {
            console.error('Error fetching task counts:', error);
          }
        };
    
        fetchTaskCounts();
      }, [id,triggerEffect]);
    
  return (
    <div className='flex mt-10 justify-between gap-5 px-2 screen'>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-blue-400'>
            <h2 className='text-3xl font-semibold'>new Task</h2>
            <h3 className='text-xl font-medium'>{taskCounts.newTask}</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-yellow-500'>
            <h2 className='text-3xl font-semibold'>active</h2>
            <h3 className='text-xl font-medium'>{taskCounts.inProgress}</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-green-400'>
            <h2 className='text-3xl font-semibold'>completed</h2>
            <h3 className='text-xl font-medium'>{taskCounts.completed}</h3>
        </div>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-red-400'>
            <h2 className='text-3xl font-semibold'>failed</h2>
            <h3 className='text-xl font-medium'>{taskCounts.uncomplete}</h3>
        </div>
    </div>
  )
}

export default TaskListNumber