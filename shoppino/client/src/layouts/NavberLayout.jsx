import React from 'react'

function NavberLayout() {
  return (
<>
    <div className='Nav bg-gray-300 w-full h-20 flex gap-[50px] items-center justify-between'>

        <div className='logo1 bg-gray-500 w-[200px] h-14 justify-self-start'>
            <div className='logo bg-blue-400 w-[150px] h-[50px]'></div>
        </div>
        <div className='search2 bg-gray-500 w-[200px] h-14 flex-grow'></div>

        <div className='buttons bg-blue-400 flex justify-between gap-5'>
        <div className='tranding3 bg-gray-500 w-[100px] h-14 flex'><div className='logo bg-blue-400 w-[50px] h-[50px]'></div><span>Logoname</span></div>
        <div className='login4 bg-gray-500 w-[100px] h-14 flex'><div className='logo bg-blue-400 w-[50px] h-[50px]'></div><span>Logoname</span></div>
        <div className='card5 bg-gray-500 w-[100px] h-14 flex'><div className='logo bg-blue-400 w-[50px] h-[50px]'></div><span>Logoname</span></div>
        <div className='more6 bg-gray-500 w-[100px] h-14 justify-self-end flex'><div className='logo bg-blue-400 w-[50px] h-[50px]'></div></div>
        </div>


    </div>
</>
  )
}

export default NavberLayout
