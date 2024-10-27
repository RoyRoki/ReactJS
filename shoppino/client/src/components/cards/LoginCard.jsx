import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { useForm } from "react-hook-form"

import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading, logout } from '../../features/slice/AuthSlice';
import LoadingPage from '../../pages/LoadingPage';



function LoginCard() {

  const {register, handleSubmit,watch,formState: { errors },} = useForm();
  const email = watch("email")

  const [error, setError] = useState('');
  const [passwordHide, setHide] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.authslice.loading);
  const user = useSelector((state) => state.authslice.user);


  const onSubmit = async (data) => {
    console.log("clicked Submit button");
      setError('');

      try {
        console.log(data)
        const responce = await AuthService.login(data);
        console.log(responce)
        const fetchedUser = await AuthService.getUser(); 
        dispatch(login(fetchedUser))
        navigate('/home');  
      } catch (err) {
        setError(err.message);
      }
  };

  const toggleEyes = (e) => {
    setHide(!passwordHide);
  }
  const isEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
  }
  useEffect(() => {
    if(user) {
      console.log("user already login , send to home (login page)");
      navigate('/home');
    } else {
      console.log("user not login,(login page)")
    }
  }, [navigate])


  if(loading) {
    return <LoadingPage />
  }

  return (
<section className='bg-gray-50 min-h-screen flex items-center justify-center'>

  <div className='bg-cyan-100 flex rounded-2xl shadow-lg max-w-3xl'>

    <div className='md:w-1/2 p-10 w-full'>
        <h2 className=
                'font-bold text-2xl text-purple-800'
          >Login</h2>
          
        <p className='text-sm mt-4 text-purple-500'
          >Login with your email and password</p>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>

          <input className={"p-2 shadow-inner mt-9 rounded-xl focus:outline-none focus:ring "
            +(isEmail(email)?"focus:ring-blue-300":"focus:ring-red-300")}
             type="email" placeholder='Email'
             {...register("email", {required: true, validate:(value) => isEmail(value)})}
          />

          <div className='relative'>

          <input className='w-full shadow-inner p-2 rounded-xl focus:outline-none focus:ring focus:ring-blue-300'
           type={passwordHide?"password":"text"}  
           placeholder='Password' 
           {...register("password", {required: true})}
          />

          <svg className={'w-5 mr-2 top-1/2 right-3 -translate-y-1/2 '+(passwordHide?"hidden":"absolute")}
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
           onClick={toggleEyes}><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
          </svg>

          <svg className={'w-5 mr-2 top-1/2 right-3 -translate-y-1/2 '+(passwordHide?"absolute":"hidden")}
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 512"
           onClick={toggleEyes}><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/>
          </svg>

          </div>

          <button className='bg-purple-400 w-full rounded-xl text-white py-3 transition-transform duration-300 hover:scale-105'
            type='submit'>
            Login</button>

        </form>
        
        <p className='text-sm text-center pt-4 text-blue-950'>{error}</p>

    <div className='mt-7 flex items-center'>
      <span className='w-full h-px bg-blue-900'></span>
      <p className='mx-2 text-blue-900'>OR</p>
      <span className='w-full h-px bg-blue-900'></span>
    </div>

    <button className='bg-white w-full py-2 mt-10 rounded-xl flex justify-between items-center text-sm transition-transform duration-300 hover:scale-105'>
      <svg className='w-9 mx-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326667 338000" ><path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4"/><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"/><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04"/><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335"/>
      </svg>
     <span className='mr-7'>Login With Google</span>
    </button>

    <button className='mt-5 text-left w-full text-purple-800 text-sm border-b pb-2'>Forget Password ?</button>

    <div className='flex justify-between mt-4 text-sm'>
      <p className=' '>If you don't have an account</p>
      <button onClick={() => navigate("/signup")} className='text-purple-800 rounded-xl w-1/3'>Register</button>
    </div>

    </div>

    <div className='md:block hidden w-1/2 p-4 mt-auto mb-auto'>
      <img className='rounded-2xl' src="https://img.freepik.com/free-psd/shopping-vertical-background_23-2150409471.jpg"
       alt="" />
    </div>


  </div>



</section>
  )
}

export default LoginCard
