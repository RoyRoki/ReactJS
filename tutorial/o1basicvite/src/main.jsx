import React from 'react'
import ReactDOM from 'react-dom/client'
import MyApp from './App.jsx'

import RokiRoy from './Roki.jsx'

const AnotherElement = (
   <a href='google.com' target='_blank'>Go Google</a>
)

const acctualReactElement = React.createElement(
    'a' ,
    {href: 'google.com' , target: '_blank'} ,
    'Click Here And Visite Google'
)

ReactDOM.createRoot(document.getElementById('root')).render(

//     <h2>Hiiii</h2>
//     MyApp()
    <MyApp/>
//   AnotherElement
// acctualReactElement

)
