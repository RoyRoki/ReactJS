import { useState } from 'react'
import './App.css'



function MyButton() {
  const [press, setPress] = useState(0)

  const handelOnclick = () => {
  setPress(press+1)
  }
  return (
    <button onClick={handelOnclick}>{press===0 ? "Hi" : press} U Can Do</button>
  )
  
}




function EvenOdd(count) {
  if(count % 2 === 0) {
    return (
      <h1>Even Number</h1>
    )
  } else {
    return (
      <h1>Odd Number</h1>
    )
  }
}






function App() {

  const [global, setGlobal] = useState('A')

  function handelOnclick () {
    setGlobal(pre => String.fromCharCode(pre.charCodeAt(0) + 1))
  }

   const [count, setCount] = useState(0)

  return (
    <>
     <h1>Hello Roki Never GiveUp</h1>
     <h1>{count}</h1>
     <button onClick={()=>setCount(count+1)}>Incriment</button>
     <button onClick={()=>setCount(count-1)}>Decriment</button>
     <MyButton />
     <MyButton />
     <GlobalButton global={global} onClick={handelOnclick}/>
     <GlobalButton global={global} onClick={handelOnclick}/>
    </>
  )
}


function GlobalButton ({global, onClick}) { 
  return (
    <button onClick={onClick}> Here: {global}</button>
  )
 }


export default App
