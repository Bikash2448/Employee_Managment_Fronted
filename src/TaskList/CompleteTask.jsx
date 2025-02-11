import React from 'react'

const CompleteTask = ({task}) => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] min-h-[300px] bg-green-400 m-4 p-4 rounded-xl'>
        <div className='text-white flex justify-between px-2 pt-4'>
            <button className=' px-1 py-1 rounded bg-red-400'>{task.category}</button>
            <span>{new Date(task.date).toLocaleDateString()}</span>
        </div>
        <div className='text-2xl p-2 font-bold'>
        {task.title}
        </div>
        <div>
            <div className=' overflow-auto px-2'>{task.description} </div>
        </div>
        <div className='flex justify-center items-center mt-8'>
            <button className='bg-green-500 text-sm rounded-md  py-1 px-2'>Completed</button>
        </div>
        
    </div>
  )
}

export default CompleteTask