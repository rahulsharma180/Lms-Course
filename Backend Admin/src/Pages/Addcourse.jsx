import React, { useContext, useEffect } from 'react'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import DashboardItems from '../Common/DashboardItems'
import Footer from '../Common/Footer'
import { mainContext } from '../Context'
import prev from '../img/generic-image-file-icon-hi.png'
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { toFormData } from 'axios'
 
// import AdminForms from '../Common/AdminForms'

function Addcourse() {
  let {changemenu} = useContext(mainContext);

  let params = useParams()
  
  

  let navigate = useNavigate();


  useEffect(() => {
    if(params.course_id!=undefined || params.course_id!= ''){
    console.log(params.course_id);}
  }, [])


  let submitHandler = (event) => {
    event.preventDefault();

    let dataSave = {
      name : event.target.course_name.value,
      image : event.target.course_name.value,
      price : event.target.course_price.value,
      duration : event.target.course_duration.value,
      description : event.target.course_description.value,
      order : event.target.course_order.value,
      status : event.target.course_status.value,
    }
    // axios.post('http://localhost:5007/api/backend/courses/add',toFormData(dataSave))
    axios.post('http://localhost:5007/api/backend/courses/add',dataSave).then((result)=>{
      if(result.data.status == true){
        
        toast.success(result.data.message)
        // 

        setTimeout(() => {
          navigate('/viewcourse');
      }, 3000);
      } else {
        toast.error(result.data.message)
      }
      // 
    }).catch((error)=>{
      toast.error('server not working !!')
    })

    
    console.log('hello');
}












  return (
    <div>

<Header/>
<ToastContainer />
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>

      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Courses
        </h1>
        <div className=''>
          <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <form onSubmit={ submitHandler }>
            Courses Name
            <input type="text"  name='course_name' className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Price
            <input type="text" name='course_price'  className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Duration
            <input type="text" name='course_duration'  className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Description
            <textarea id="" name='course_description' className='border px-4 pt-3 border-gray-400 my-2 w-full h-[100px]' cols="30" rows="10"></textarea>

            Courses Order
            <input type="text" name='course_order'  className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />

            <input type="file" id='file-input' className='border hidden border-gray-400 w-full h-[50px] mb-3 mt-2 '/>
            <div className='flex items-center gap-0 mt-[80px]'>
              <div className='w-full flex items-center'>
            <input type="text" readOnly placeholder='Upload File' className=' px-4 rounded-[10px_0px_0px_10px] border border-gray-400 w-[70%] h-[50px]' />
            <label id="file-input-label" for="file-input" className='border block  bg-[#4B49AC] text-white text-center leading-[50px]  w-[10%] rounded-[0px_20px_20px_0px] h-[50px]  '>Upload</label>
            </div>
            <div className=''>
              <img src={prev} alt="" width={150} />
            </div>
            </div>
            Courses Stauts
            <div className='flex items-center mt-5  mb-8 gap-2'>
            <input type="radio" name='course_status' value='1' className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Active
            <input type="radio" name='course_status'  value='1' className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Deactive
            </div>
            
            <input type="submit" className='bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white' />
            <input type="reset" value="Cancel" className='bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black' />
          </form>
          </div>
        </div>
      <Footer className/>
      </div>
    </div>

    </div>
  )
}

export default Addcourse