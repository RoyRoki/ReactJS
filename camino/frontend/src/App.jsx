import { useState } from 'react'
import './App.css'
import SignupForm from './singupForm';
import LoginForm from './LoginForm';
import UserList from './UsersList';

function App() {
  const [test, setTest] = useState("not connected");
  
  async function handleOnClick() {
    const TESTURL = "http://localhost:8080"

    try {
      const response = await fetch(TESTURL, {method:'GET'})
      if(!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const json= await response.json();
      console.log(json.message)
      setTest(json.message)
    } catch(error) {
      console.log(error.message)
      setTest(error.message)
    }
  }

  return (
    <>
     <button onClick={handleOnClick}>Test BF realation</button>
     <h1>{test}</h1>
     <SignupForm />
     <LoginForm />
     <UserList /> 
    </>
  )
}

export default App
