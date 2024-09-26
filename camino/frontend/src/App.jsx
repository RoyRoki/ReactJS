import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
    </>
  )
}

export default App
