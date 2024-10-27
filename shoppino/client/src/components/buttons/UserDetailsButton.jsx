import React, { useEffect, useState } from 'react'
import SvgComponent from '../SvgComponent'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import DetailsFillCard from '../cards/DetailsFillCard';


function UserDetailsButton() {
  const user = useSelector((state) => state.authslice.user);
  const [DetailsFill, setDetailsFill] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    setDetailsFill(!DetailsFill);
  }

  return (
          <>
            <div className='group flex items-center justify-start cursor-pointer' onClick={handleOnClick}>
                <SvgComponent className='w-6 h-6' name="userIcon" />
                <span className='ml-2 text-white'>{user === null ? "null" : user.username}</span>
                <SvgComponent className='w-6 h-6 ml-2 transform transition-transform duration-300 group-hover:rotate-180' name="arrowUpIcon" />
            </div>
            <div className={`absolute right-[16%] mt-12  ${DetailsFill ? 'flex' : 'hidden' }`}>
              <DetailsFillCard />
            </div>
          </>

  )
}

export default UserDetailsButton
