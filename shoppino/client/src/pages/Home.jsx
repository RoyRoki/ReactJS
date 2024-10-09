import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.value);
    const email = useSelector(state => state.auth.email);

    useEffect(()=> {}, [authStatus])

  return (
    <>
    <h1>Home sweet  home </h1>
    <h3>Login Status: {authStatus? "Login User":"Login please"}</h3>
    <h2>Email Id: {email || "not mention"}</h2>
      {
        authStatus 
          ? <button onClick={() => navigate("/logout")}>Logout</button> 
          : <button onClick={() => navigate("/login")}>Login</button>
      }    
    </>
  )
}

export default Home
