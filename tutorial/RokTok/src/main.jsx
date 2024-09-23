import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {Provider} from 'react-redux'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import store  from './store/store.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SingUp from './pages/SingUp.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Protected from './components/Protected.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          
          <Protected  authentication={false} >
             <Login />
             
          </Protected>
        )
      },
      {
        path: "/singup",
        element: (
          
          <Protected  authentication={false} >
             <SingUp />
             
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (
          
          <Protected  authentication>
             <AllPosts />
             
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          
          <Protected  authentication>
             <AddPost />
             
          </Protected>
        )
      },
      {
        path: "/edit/:slug",
        element: (
          
          <Protected  authentication>
             <EditPost />
             
          </Protected>
        )
      },
      {
        path: "/post",
        element: (
          
          <Protected >
             <Post />
             
          </Protected>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)