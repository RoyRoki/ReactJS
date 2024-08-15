import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)
  let myArr = [1,2,3,5,4,8,9]
  const user = {
    name: 'Roki',
    roll: '503',
    clg: 'siliguri college',
    address: {
      country: 'India',
      state: 'WB'
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold bg-green-500 p-5 rounded-md">
        Hello world!
       </h1> 
       <Card userName="Roki" phNumber='9800881300'/>
       <Card user={user} myArr={myArr}/>
       <Card user={user} myArr={myArr}/>
    </>
  )
}

export default App
