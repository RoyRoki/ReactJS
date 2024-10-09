import React from 'react'
import SvgComponent from '../SvgComponent'

function LoginButtonBox() {
  return (

            <div className='group flex items-center justify-start'>
                <SvgComponent className='w-6 h-6' name="userIcon" />
                <span className='ml-2 text-white'>Login</span>
                <SvgComponent className='w-6 h-6 ml-2 transform transition-transform duration-300 group-hover:rotate-180' name="arrowUpIcon" />
            </div>

  )
}

export default LoginButtonBox
