import React, { useState } from 'react'
import axios from 'axios'

const CreateTask = ({onTaskCreated}) => {

    const [taskTitle,setTaskTitle]=useState('')
    const [date, setDate] = useState('')
    const [asignto, setAsignto] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [task, setTask] = useState([])

    const onSubmitHandler =async(e)=>{
        e.preventDefault()
        if (!taskTitle || !date || !asignto || !category || !description) {
            setError('All fields are required.');
            return;
          }
      
          setError(''); 
          setSuccess('');
          setLoading(true); 

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
                userName: asignto, 
                title: taskTitle,
                description,
                category,
                date,
                status: 'newTask',
            });
            console.log('Data send')
            // navigate("/");
            onTaskCreated();
          } catch (error) {
            console.log("what",error);
          }


        setAsignto("")
        setCategory("")
        setDate("")
        setTaskTitle("")
        setDescription('')
    }

  return (
    <div>
        <div className='p-5 bg-[#1c1c1c] mt-7 rounded'>
            <form onSubmit={(e)=>onSubmitHandler(e)} className='flex flex-wrap w-full items-start justify-between'>
                <div  className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input 
                        value={taskTitle}
                        onChange={(e)=>{
                            setTaskTitle(e.target.value)
                        }} className='text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type='text'/>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                        value={date}
                        onChange={(e)=>{
                            setDate(e.target.value)
                        }} 
                         className='text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type='date'/>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign To</h3>
                        <input
                        value={asignto}
                        onChange={(e)=>{
                            setAsignto(e.target.value)
                        }} 
                         className='text-sm text-white py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type='text'/>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input 
                        value={category}
                        onChange={(e)=>{
                            setCategory(e.target.value)
                        }} 
                        className='text-sm py-1 text-white px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type='text'/>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea
                    value={description}
                        onChange={(e)=>{
                            setDescription(e.target.value)
                        }} 
                     className='w-full h-44 text-white text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400 ' name='' id=''></textarea>
                    <button className='mt-4 w-full text-sm rounded hover:bg-emerald-600 py-3 bg-emerald-400'>Create Task</button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default CreateTask