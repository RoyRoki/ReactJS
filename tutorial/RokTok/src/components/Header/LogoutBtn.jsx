import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../auth/auth'
import {Logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(Logout());
        })
    }
  return (
    <button 
       onClick={logoutHandler}
       ClassName="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >Logout</button>
  )
}

export default LogoutBtn
