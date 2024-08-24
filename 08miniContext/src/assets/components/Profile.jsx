import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext'

function Profile() {
  
    const {user} = useContext(UserContext)
    if(!user) return <h1>Not Login</h1>
    return (
    <div>
    <h1>Profile Page</h1>  
      <h3>Name: {user.username}</h3>
      <h3>password: {user.password}</h3>
      <h1>Year: {user.year}</h1>
    </div>
  )
}

export default Profile
