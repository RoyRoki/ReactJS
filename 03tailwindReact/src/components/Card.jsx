import React from 'react'
  const defaultUser = {
    name: 'User',
    roll: '000',
    clg: 'College',
    address: {
      country: 'Earth',
      state: 'Land'
    }
  }
const Card = ({userName = 'User' , phNumber = '0000000001', user = defaultUser , myArr = [0,0,0]}) => {      
  //props , props.userName || userName    //userName || 'My'  this is not good approse
  userName += "'s"                                                      
  return (
    
    <div>
        <img src="/java.png" alt="img" />         
        <h3 className='text-2xl bg-blue-500 p-5 rounded-2xl'>This Is {userName} Favorite Language</h3>
        <h4 className='text-2xl bg-black-500 rounded-s-sm'>{phNumber}</h4>
        <h5>{user.address.country} {user.roll}</h5>
        <p >Java is a object oreanted high level programming language , it is totally oop orianted</p>
        <p>{myArr}</p>
    </div>
  )
}

export default Card