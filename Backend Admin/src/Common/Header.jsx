import React, { useContext, useEffect, useState } from 'react'
import logo from '../img/logo (1).svg'
import minlogo from '../img/logo-mini.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { mainContext } from '../Context'
import { useNavigate } from 'react-router';
import { Cookies } from 'react-cookie';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

function Header() {
  let nav = useNavigate();
  const cookies = new Cookies();

  
  let {changemenu,setchangeMenu} = useContext(mainContext);
  
  const logout = ()=>{
    console.log('logout');
    cookies.remove('token');
    nav('/'); 
  } 
  useEffect(() => {

    const userToken = cookies.get('token');
     if (!userToken) {
      toast.error("Authentication required. Redirecting to login...");
      nav("/");
      return;
    }
    axios.post('http://localhost:5007/api/frontend/users/profile','',{
      headers : {
        'authorization' : userToken
      }
    })    
    .then((success) => {
      if(success.data.token_error == true){
        cookies.remove('token');
        nav('/');  
    }else {
      console.log("User profile fetched:", success.data);   
     }
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      toast.error('Something went wrong !!');
    })

  },[cookies, nav]);
  
  return (
    <>
    <ToastContainer/>
      <header>
    <nav className=" border-gray-200  py-2.5 bg-white shadow-lg relative z-[999]">
        <div className="flex  justify-between items-center mx-auto ">
            <div className={` duration-[0.5s] mx-5  ${changemenu==true ? 'w-[3%] ':'w-[16%]'}`}>
            <a href="#" className="flex items-center">
              {
                changemenu==true ?
                <img src={minlogo} className="mr-3 h-6 sm:h-9"  />
                :
                <img src={logo} className="mr-3 h-6 sm:h-9"  />

              }
              
            </a>
            </div>
            
            
            <div className={`flex items-center lg:order-2 w-[84%] duration-[0.5s] ${changemenu==true ? 'w-[97%]' : 'w-[84%]'}  justify-between`}>
                <FontAwesomeIcon icon={faBars} onClick={()=>setchangeMenu(!changemenu)}/>
                <div>
                <a onClick={()=>logout()} className="text-gray-800  cursor-pointer focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log Out</a>
                <a href="#" className=" bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">My Profile</a>
                </div>
            
           
            </div>
        </div>
    </nav>
</header>
    
    </>
  )
}

export default Header