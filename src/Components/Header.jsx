import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const Header = () => {

  const location = useLocation();
  const { name } = location.state || {};
  const navigate = useNavigate()

  const logout=()=>{
    navigate('/')
  }
 
  return (
    <div className='flex items-end justify-between mt-0 mr-8 pr-4 pl-4'>
        <h1 className='text-2xl text-white font-medium'>Hello <br/> <span className=' text-4xl'>{name}👋</span></h1>
        <button onClick={logout} className='bg-red-500 rounded-md py-2 text-white px-5'>Log Out</button>
    </div>
  )
}

export default Header