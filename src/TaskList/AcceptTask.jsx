import React from 'react'
import axios from 'axios';

const AcceptTask = ({task,onUpdate}) => {
    // console.log(data)

    const updateTaskStatus = async (status) => {
        try {
          // API call to update the task's status in the database
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/tasks/${task._id}`, {
            status, // Sending the new status as part of the request body
          });
          console.log('Task updated:', response.data);
    
          // Call the parent component's refresh function to update the UI
          onUpdate();
        } catch (error) {
          console.error('Error updating task status:', error);
        }
      };




  return (
    
    <div className='flex-shrink-0 h-full w-[300px] min-h-[300px] bg-yellow-400 m-4 p-4 rounded-xl'>
        <div className='text-white flex justify-between px-2 pt-4'>
            <button className='px-1 py-1 rounded bg-red-400'>{task.category}</button>
            <span>{new Date(task.date).toLocaleDateString()}</span>
        </div>
        <div className='text-2xl p-2 font-bold'>
        {task.title}
        </div>
        <div>
            <div className=' overflow-auto px-2'>{task.description} </div>
        </div>
        {/* <div className='flex justify-center items-center mt-8'>
            <button className='bg-green-500 rounded-md text-sm py-1 px-2'>Accepted </button>
            
        </div> */}
        <div className='flex justify-between mx-4 mt-8'>
            <button onClick={() => updateTaskStatus('completed')} className='bg-green-500 text-sm py-1 rounded-md px-2'>Mark Completed</button>
            <button onClick={() => updateTaskStatus('uncomplete')} className='bg-red-500 text-sm rounded-md py-1 px-2'>Mark Failed</button>
        </div>
        
    </div>
  )
}

export default AcceptTask