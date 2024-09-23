import React from 'react'
import { useParams } from 'react-router-dom'

export default function user() {
  const {userid} = useParams();
  return (
   <div  className='bg-orange-500'>
        <h2>Hi Home here Build your site using React</h2>
        <h3>Lets connect he he he </h3>
        <h1 className='text-center font-mono text-6xl'>User:{userid}</h1>
        <p>Hi my name is roki i am a science lover and space</p>
    </div>
  )
}
