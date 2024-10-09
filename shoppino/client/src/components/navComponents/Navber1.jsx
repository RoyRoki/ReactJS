import React from 'react'
import Searchbar from '../buttons/Searchber'
import SvgComponent from '../SvgComponent'
import LoginButtonBox from '../buttons/LoginButtonBox'
import CartButton from '../buttons/CartButton'
import TrandingButton from '../buttons/TrandingButton'

function Navber() {
  return (
    <>
    <div className='w-full h-16 flex gap-8 items-center justify-evenly bg-[#230D41]'>

        <div className='justify-self-start'>
          <SvgComponent className='scale-50' name={"shoppinoLogo"} />
        </div>
        
        <div className='flex-grow'>
        <Searchbar />
        </div>

      <TrandingButton />
      <LoginButtonBox />
      <CartButton />
      <SvgComponent className='w-7 mr-5 justify-self-end cursor-pointer ease-in-out duration-300 hover:scale-105' name={"moreIcon"} />
      </div>
    </>
  )
}

export default Navber
