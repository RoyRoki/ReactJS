import React, { useState , useContext} from 'react'
import UserContext from '../../Context/UserContext'

function Login() {
    
    const [username , setusername] = useState("")
    const [password , setPassword] = useState("")
    const [year , setYear] = useState(1)

    const {setUserx} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault() 
          setUserx({username , password , year})
    }

  return (
    <div>
      <h1>Login Page Bro</h1>

      <input 
      type="text"
      onChange={(e) => setusername(e.target.value)}
      placeholder='userName' />
      {"    "}

      <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder='password' />

      <input 
      type="range" 
      value={year} 
      min="1" 
      max="85" 
      onChange={(e) => setYear(e.target.value)} />
      <h3>{year}</h3>

      <button
      onClick={handleSubmit}>
        Submit
      </button>

    </div>
  )
}

export default Login
