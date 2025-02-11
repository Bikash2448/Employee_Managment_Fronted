import React, { useState } from 'react'
import CreateTask from '../Others/CreateTask'
import AllTask from '../Others/AllTask'
import Header from '../Components/Header'

const Admin = () => {
    const [refresh, setRefresh] = useState(false);
  
    const handleTaskCreated = () => {
      setRefresh((prev) => !prev); // Toggle refresh state to re-trigger AllTask
    };


  return (
    <div className='h-screen w-full bg-[#1c1c1c] overflow-x-auto  p-7'>
        <Header/>
        <CreateTask onTaskCreated={handleTaskCreated}/>
        <AllTask refresh={refresh}/>
    </div>
  )
}

export default Admin