import React, { useEffect } from 'react'
import Header from '../Common/Header'
import logo from '../img/logo (1).svg';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Cookies } from 'react-cookie';
function Login() {
  let nav = useNavigate();

  const cookies = new Cookies();

  const loginHandler = (event) => {
    event.preventDefault();

    var data = {
      email : event.target.email.value,
      password : event.target.password.value
    }

      axios.post('http://localhost:5007/api/frontend/users/login',data)
      .then((result) => {
        if(result.data.status == true){
          cookies.set('token',result.data.token);
          nav('/dashboard');
        } else {
          toast.error(result.data.message);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong');
      })
  }

  useEffect(() => {
    var token = cookies.get('token');

    if(token != undefined){
      nav('/dashboard');
    }
  },[]);
  return (
   
    <div className='bg-[#F5F7FF] w-full h-[100vh] flex justify-center items-center'>
      <ToastContainer/>
        <div className='w-[500px] py-5 bg-white px-[50px] py-[50px] '>
            <img src={logo} alt="" width={180} className='mb-5' />
            <h3 className='text-black text-[16px] font-[400]'>Sign in to continue.</h3>
        <form action="" onSubmit={loginHandler}>
            <input type="text" name='email' className=' mt-5 px-7 text-[16px] focus:outline-blue-400 w-full h-[50px] border border-1 border-[#c5c0c0]' placeholder='Username'  />
            <input type="password" name='password' className=' mt-6 mb-5 px-7 text-[16px] focus:outline-blue-400 w-full h-[50px] border border-1 border-[#c5c0c0]' placeholder='Password'  />

            <input type="submit" className='w-full bg-[#4B49AC] text-center text-[30px] text-white py-5 rounded-[18px] font-[arial] font-sans font-[400]' />
        <div className='flex items-center justify-between mt-4 mb-4'>
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