import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className='shadow sticky z-50 top-0'>
       <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5'>
         <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
           <Link to='/' className='flex items-center'>
           <img src="https://cdn1.byjus.com/wp-content/uploads/2020/06/Full-Forms-NASA1.png"
                className="mr-3 h-12"
                alt="Logo"/>
           </Link>

            <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
               <li>
           <NavLink to="/" 
                    className={({isActive}) =>
                         `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100
                         ${isActive ? 
                            "text-blue-400" :
                            "text-gray-600" }                     
                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                    }>
                    <h1 className='text-4xl'>Home</h1>
           </NavLink>
           </li>

           <li>
           <NavLink to="/about" 
                    className={({isActive}) =>
                         `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100
                         ${isActive ? 
                            "text-blue-400" :
                            "text-gray-600" }                     
                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                    }>
                    <h1 className='text-4xl'>About</h1>
           </NavLink>
               </li>

               <li>
           <NavLink to="/user" 
                    className={({isActive}) =>
                         `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100
                         ${isActive ? 
                            "text-blue-400" :
                            "text-gray-600" }                     
                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                    }>
                    <h1 className='text-4xl'>User</h1>
           </NavLink>
               </li>
               <li>
           <NavLink to="/contact" 
                    className={({isActive}) =>
                         `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100
                         ${isActive ? 
                            "text-blue-400" :
                            "text-gray-600" }                     
                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                    }>
                    <h1 className='text-4xl'>Contact</h1>
           </NavLink>
               </li> 

               <li>
            <NavLink to="/github" 
                    className={({isActive}) =>
                         `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100
                         ${isActive ? 
                            "text-blue-400" :
                            "text-gray-600" }                     
                         hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                    }>
                    <h1 className='text-4xl'>GitHub</h1>
           </NavLink>
               </li>
            </ul>

         </div>
       </nav>
    </header>
  )
}


