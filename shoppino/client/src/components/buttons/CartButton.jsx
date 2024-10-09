import React from 'react'
import SvgComponent from '../SvgComponent'


function CartButton() {
  return (
            <div className='flex items-center justify-start'>
                <SvgComponent className='w-6 h-6 text-white' name="cartIcon" />
                <span className='ml-2 text-white'>Cart</span>
                <span className='text-yellow-300 font-light group-hover:text-white font-mono -translate-y-1 p-1'>1</span>
            </div>
  )
}

export default CartButton
