import { useState } from 'react'
import '../src/styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginCard from './components/cards/LoginCard'
import RegisterCard from './components/cards/RegisterCard.jsx'

import UserStore from './stores/UserStore.js'
import { Provider } from 'react-redux'
import Home from './pages/Home.jsx'
import NavBer from './components/navComponents/NavBer.jsx'
import NavberLayout from './layouts/NavberLayout.jsx'

function App() {

  return (
    <Provider store={UserStore} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavBer />}/>
          <Route path='/layout' element={<NavberLayout />}/>
          <Route path="/login" element={<LoginCard/>} />
          <Route path='/signup' element={<RegisterCard />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
