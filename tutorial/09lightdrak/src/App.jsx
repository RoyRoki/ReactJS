import { useEffect, useState } from 'react'

import './App.css'
import Card from './components/Card'
import TheamButton from './components/TheamButton'
import {ThemProvider} from './context/theam'

function App() {

  const [themMode , setThem] = useState("light")

  const darkTheam = () => {
    setThem("dark")
  }
  const lightTheam = () => {
    setThem("light")
  }

  useEffect(() => {
   document.querySelector('html').classList.remove('dark','light')
   document.querySelector('html').classList.add(themMode)
  } , [themMode])

  return (
    <ThemProvider value={{themMode , darkTheam , lightTheam}}>

    <h1 className="text-6xl text-green-500">
      Hello React!
    </h1> 
     <TheamButton/>
     <Card />

    </ThemProvider>
  )
}

export default App
