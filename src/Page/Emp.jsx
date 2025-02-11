import React, { useState } from 'react'
import Header from '../Components/Header'
import TaskList from '../TaskList/TaskList'
import TaskListNumber from '../Others/TaskListNumber'

const Emp = () => {
  
  const [triggerEffect, setTriggerEffect] = useState(false);

  const triggerBothEffects = () => {
    setTriggerEffect((prev) => !prev); // Toggle the state to trigger useEffect
  };

  return (
    <div className='bg-[#1c1c1c] min-h-screen '>
        <Header/>
        <TaskListNumber triggerEffect={triggerEffect} triggerBothEffects={triggerBothEffects}/>
        <TaskList triggerEffect={triggerEffect} triggerBothEffects={triggerBothEffects}/>
    </div>
  )
}

export default Emp