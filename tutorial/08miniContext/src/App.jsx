import { useState } from 'react'
import './App.css'
import Login from './assets/components/Login'
import Profile from './assets/components/Profile'
import UserContextProvider from './Context/userContextProvider'

function App() {

  return (
    <UserContextProvider>

    <h1>React Pro op</h1>
    <Login />
    <Profile /> 
    
    </UserContextProvider>
  )
}

export default App
