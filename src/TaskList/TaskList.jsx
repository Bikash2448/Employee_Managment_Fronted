import React, { useEffect, useState } from 'react'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import AcceptTask from './AcceptTask'
import FailedTask from './FailedTask'
import axios from 'axios'
import { useLocation } from 'react-router-dom'


const TaskList = ({ triggerEffect, triggerBothEffects }) => {
    const [tasks, setTasks] = useState([]);

    const location = useLocation();
    const { id } = location.state || {};


    async function getTasks() {
        try{
            const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/tasks`)
            const allTasks = response.data;
            console.log("gh",response.data)

            const userTasks = allTasks.find((task) => task.user === id)?.tasks || [];  //find task for specific user
            setTasks(userTasks);
            triggerBothEffects()
        }catch(e){

        }      
    }

    useEffect(()=>{
        getTasks()
    },[id,triggerEffect])

    const handleUpdate = ()=>{
        getTasks()
    }


    const newTasks = tasks.filter((task) => task.status === 'newTask');
    const completedTasks = tasks.filter((task) => task.status === 'completed');
    const activeTasks = tasks.filter((task) => task.status === 'inProgress');
    const failedTasks = tasks.filter((task) => task.status === 'uncomplete');


  return (
    <div id='tasklist' className=' pr-4 mx-2 w-full mt-10 flex items-center justify-around rounded-md bg-[#1c1c1c] gap-5 flex-nowrap overflow-y-auto overflow-x-auto py-5'>

        {newTasks.length > 0 &&
        newTasks.map((task, index) => (
          <NewTask key={index} task={task} onUpdate={handleUpdate} />
        ))}

        {completedTasks.length > 0 &&
            completedTasks.map((task, index) => (
            <CompleteTask key={index} task={task} />
            ))}

      
        {activeTasks.length > 0 &&
            activeTasks.map((task, index) => (
            <AcceptTask key={index} task={task} onUpdate={handleUpdate} />
            ))}

      
        {failedTasks.length > 0 &&
            failedTasks.map((task, index) => (
            <FailedTask key={index} task={task} />
            ))}



    </div>
  )
}

export default TaskList