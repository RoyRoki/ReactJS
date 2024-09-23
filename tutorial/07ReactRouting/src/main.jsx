import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import Home from './components/home/Home.jsx'

import { createBrowserRouter , createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import About from './components/about/About.jsx'
import Contact from './components/contact/Contact.jsx'
import User from './components/user/User.jsx'
import Github , {GitHubInfoLoder} from './components/github/Github.jsx'

const myrouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
       
      <Route path='user/' element={<User />}>
         <Route path=':userid' element={<User />} />
      </Route>

      <Route
       loader={GitHubInfoLoder}
       path='github/'
       element={<Github/>} />      


      <Route path='*' element={<Error/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myrouter}/>
  </StrictMode>,
)
