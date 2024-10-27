import { useState } from 'react'
import '../src/styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, {persistor} from './stores/Store.js'

import LoginCard from './components/cards/LoginCard'
import RegisterCard from './components/cards/RegisterCard.jsx'
import Home from './pages/Home.jsx'
import NavberLayout from './layouts/NavberLayout.jsx'
import PublicPage from './pages/PublicPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'


function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicPage />}/>
          <Route path='/loading' element={<LoadingPage />} />
          <Route path='/layout' element={<NavberLayout />}/>
          <Route path="/login" element={<LoginCard/>} />
          <Route path='/signup' element={<RegisterCard />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>

      </PersistGate>
    </Provider>
  )
}

export default App
