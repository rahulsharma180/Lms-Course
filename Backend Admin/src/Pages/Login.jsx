import React from 'react'
import Header from '../Common/Header'
import logo from '../img/logo (1).svg';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
function Login() {
  let nav = useNavigate();
  function loginHandler(){
    nav("/dashboard")
  }
  return (
   
    <div className='bg-[#F5F7FF] w-full h-[100vh] flex justify-center items-center'>
        <div className='w-[500px] py-5 bg-white px-[50px] py-[50px] '>
            <img src={logo} alt="" width={180} className='mb-5' />
            <h3 className='text-black text-[16px] font-[400]'>Sign in to continue.</h3>
        <form action="" onSubmit={loginHandler}>
            <input type="text" className=' mt-5 px-7 text-[16px] focus:outline-blue-400 w-full h-[50px] border border-1 border-[#c5c0c0]' placeholder='Username'  />
            <input type="text" className=' mt-6 mb-5 px-7 text-[16px] focus:outline-blue-400 w-full h-[50px] border border-1 border-[#c5c0c0]' placeholder='Password'  />

            <Link to={'/dashboard'}><input type="submit" className='w-full bg-[#4B49AC] text-center text-[30px] text-white py-5 rounded-[18px] font-[arial] font-sans font-[400]' /></Link>
        <div className='flex items-center mt-4 justify-between mb-4'>
            <div className='flex items-center text-[gray] font-sans'> <input type="checkbox" className='mr-3 w-[17px] h-[17px]  appearance-none outline outline-2 outline-blue-700' />Keep me signed in</div>
            <div className='flex items-center text-[black] font-sans'>
            Forgot password? </div>
        </div>
        </form>
        </div>
    </div>
    
  )
}

export default Login