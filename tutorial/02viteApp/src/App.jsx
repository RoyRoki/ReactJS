import { useState } from 'react'
import './App.css'

function App() {

  // let counter = 7;
  const [counter , setCounter] = useState(0);
  const addValue = () => {
    //  ++counter;
    setCounter((oldCount )=> oldCount + 1)
    setCounter((oldCount )=> oldCount + 1)
    setCounter((oldCount )=> oldCount + 1)
    setCounter((oldCount )=> oldCount + 1)
    console.log(counter)
  }

  const removeValue = () => {
    //  --counter;
     setCounter(counter - 1)
     setCounter(counter - 1)
     setCounter(counter - 1)
     setCounter(counter - 1)

     console.log(counter)
     
  }

  return (
    <>
      <h1>Hi Roki Here</h1>
      <h2>Counter val is {counter}</h2> 
      <button onClick = {addValue}>Add Value</button>
      <button onClick = {removeValue}>Remove Value</button>
      <p>Footer: {counter}</p>
    </>
  )
}

export default App
