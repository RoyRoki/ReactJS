import { useState } from 'react'

import RokiRoy from './Roki'

const userName = "Roki Roy";

function MyApp() {
return (
  <>
     <h1>Vite React Myapp {userName} custom</h1>
     <h1>Vite React Myapp {5*5}</h1>
     <RokiRoy/>
  </>
 )
}

const AnotherElement = (
   <a href='google.com' target='_blank'>Go Google</a>
)

export default MyApp
