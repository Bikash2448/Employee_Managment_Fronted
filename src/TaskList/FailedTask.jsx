import React from 'react'

const FailedTask = ({task}) => {
  return (
    <div className='flex-shrink-0 h-full min-h-[300px] w-[300px] bg-red-300 m-4 p-4 rounded-xl'>
        <div className='text-white flex justify-between px-2 pt-4'>
            <button className=' px-1 py-1 rounded bg-red-800'>{task.category}</button>
            <span>{new Date(task.date).toLocaleDateString()}</span>
        </div>
        <div className='text-2xl p-2 font-bold'>
        {task.title}
        </div>
        <div>
            <div className=' overflow-auto px-2'>{task.description} </div>
        </div>
        <div className='flex justify-center items-center mt-8'>
            <button className='bg-red-500 text-sm rounded-md py-1 px-2'>Failed</button>
        </div>
        
    </div>
  )
}

export default FailedTask