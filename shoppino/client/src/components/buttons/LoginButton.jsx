import React from 'react'
import SvgComponent from '../SvgComponent'
import { useNavigate } from 'react-router-dom'


function LoginButton() {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/login');
  }
  return (

            <div className='group flex items-center justify-start cursor-pointer' onClick={handleOnClick}>
                <SvgComponent className='w-6 h-6' name="userIcon" />
                <span className='ml-2 text-white'>Login</span> 
            </div>

  )
}

export default LoginButton
