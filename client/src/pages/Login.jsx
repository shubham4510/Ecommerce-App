import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const [isRegister, setIsRegister ] = useState(false)
  const [userDetails,setUserDetails] = useState({})
  const navigate = useNavigate()

  const {signup,login} = useContext(ShopContext)

  const handleUserDetails = (e)=>{
    setUserDetails((prev) => (
      {...prev,[e.target.name]:e.target.value}
    ))
  }

  const handleUserLogin = async (userDetails)=>{
    const data = await login(userDetails)
    if(data && data.success){
      navigate('/')
    }
  }

  const handleSignUp = async (userDetails) => {
    const data = await signup(userDetails); // Call signup function once
  
    if (data && data.success) { // Check if signup was successful
      setIsRegister(true)
    }
  };
  

  return (
    <div className=' h-screen flex justify-center items-center'>
      <div className='h-[60%] md:w-[30%] sm:w-1/2 flex flex-col gap-3 border border-gray-600 px-4 py-10 rounded-lg shadow-lg'>
        <div className=" flex items-center justify-center mb-5">
          <h3 className='flex items-center gap-2 text-5xl'>{`${isRegister?"Login":"Sign Up"}`} <div className=' mt-2 rounded-full h-[2px] w-10 bg-black'></div></h3>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col gap-2'>
          {
            isRegister ? "":<input className=' outline-none border border-black px-4 py-3' onChange={handleUserDetails} type="text" name='name' placeholder='Name'  />
          }
          <input className='  outline-none border border-black px-4 py-3' onChange={handleUserDetails} type="email" name='email' placeholder='Email'  />
          <input className= '  outline-none border border-black px-4 py-3' onChange={handleUserDetails} type="password" name='password' placeholder='Password'  />
        </form>
        <div className=" flex lg:flex-row flex-col justify-between sm:items-start text-sm">
          <p className='cursor-pointer'>Forgot your password?</p>
          <p onClick={()=>setIsRegister(!isRegister)} className='cursor-pointer hover:underline'>{`${isRegister?"Create an account":"Log In"}`}</p>
        </div>
        <div className=" sm:mt-3 text-center">
          <button onClick={()=>{isRegister?handleUserLogin(userDetails):handleSignUp(userDetails)}} className=' bg-black px-4 py-2 text-white'>{`${isRegister?"Login":"Sign Up"}`}</button>
        </div>
      </div>
    </div>
  )
}

export default Login