import { useState } from 'react'
import './App.css'

function App() {

  const [a , setA] = useState('A')
  const [b , setB] = useState('B')

  const swap = () => {
    setA(b)
    setB(a)
  }
  
  return (
   <div>
     <h1>Hello World!</h1>
     <h1>A is {a}</h1>
     <h1>B is {b}</h1>
     <button onClick={() => swap()}>Swap</button>
   </div>
  )
}

export default App
