import { useState } from 'react'
import './App.css'
import Provider from 'redux'
import {store} from '../src/store/Store'

function App() {

  return (
    <Provider store={store}>
      <h1 className='bg-green-500 text-5xl'>hello world</h1>
    </Provider>
  )
}

export default App
