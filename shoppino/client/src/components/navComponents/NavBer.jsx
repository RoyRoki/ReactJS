import React from 'react'
import SvgComponent from '../SvgComponent'
import Searchbar from '../buttons/Searchber'
import TrandingButton from '../buttons/TrandingButton'
import CartButton from '../buttons/CartButton'
import MoreButton from '../buttons/MoreButton'
import UserDetailsButton from '../buttons/UserDetailsButton'

function NavBer() {
  return (
<>
    <div className='bg-[#230D41] w-full h-[65px] flex gap-[50px] items-center justify-between'>

        <div className=' w-[200px] h-14 justify-self-start'>
            <SvgComponent  className='scale-[1.6]' name={"shoppinoResizeLogo"} />
        </div>

        <div className=' w-[200px] h-14 flex-grow flex items-center'>
            <Searchbar />
        </div>

        <div className='flex justify-evenly mx-2 gap-7'>
                <TrandingButton />
                <UserDetailsButton />
                <CartButton />
                <MoreButton />                       
        </div>
    </div>
</>
  )
}

export default NavBer
