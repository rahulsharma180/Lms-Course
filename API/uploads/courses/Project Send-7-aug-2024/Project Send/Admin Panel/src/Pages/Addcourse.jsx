import React, { useContext, useEffect, useState } from 'react'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import DashboardItems from '../Common/DashboardItems'
import Footer from '../Common/Footer'
import { mainContext } from '../Context'
import prev from '../img/generic-image-file-icon-hi.png'
import axios, { toFormData } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router'
// import AdminForms from '../Common/AdminForms'

function Addcourse() {
  let {changemenu} = useContext(mainContext);

  let [formSubmit, setFormSubmit] = useState(false);
  let params = useParams();

  let [input, setInput] = useState({
    course_name : "",
    course_image : "",
    course_price : "",
    course_duration : "",
    course_description : "",
    course_status : "",
    course_order : "",
  })

  useEffect(() => {
    if(params.course_id != undefined){
      axios.post('http://localhost:5005/api/backend/courses/details/'+params.course_id)
      .then((result) => {
        console.log(result.data.data);

        setInput({
          course_name : result.data.data.name,
          course_image : result.data.data.image,
          course_price : result.data.data.price,
          course_duration : result.data.data.duration,
          course_description : result.data.data.description,
          course_status : result.data.data.status,
          course_order : result.data.data.order,
        })
      })
      .catch((error) => {
          toast.error('Something went wrong');
      })
    }
  },[]);

  let navigation = useNavigate();

  let submitHandler = (event) => {
    event.preventDefault();

    if(event.target.course_order.value == ''){
      var order = 1;
    } else {
      var order = event.target.course_order.value;
    }

    if(event.target.course_status.value == ''){
      var status = 1;
    } else {
      var status = event.target.course_status.value;
    }
    // console.log('order - '+event.target.course_order.value);

    let form = new FormData(event.target);

    // console.log(form);

    let dataSave = {
      name : form.get('course_name'),
      price : form.get('course_price'),
      duration : form.get('course_duration'),
      description : form.get('course_description'),
      order : order,
      status : status,
    }

    // console.log(dataSave);

    if(form.get('course_image') != ''){
      dataSave.image = form.get('course_image');
    }

    if(params.course_id == undefined){
      axios.post('http://localhost:5005/api/backend/courses/add',toFormData(dataSave)).then((result) => {
        if(result.data.status == true){
          toast.success(result.data.message);
          setFormSubmit(true)
        } else {
          toast.error(result.data.message);
        }
        console.log(result.data);
      }).catch((error) => {
        toast.error('something went wrong');
        console.log('something went wrong');
      })
    } else {
      dataSave.id = params.course_id;
      axios.put('http://localhost:5005/api/backend/courses/update',toFormData(dataSave)).then((result) => {
        if(result.data.status == true){
          toast.success(result.data.message);
          setFormSubmit(true)
        } else {
          toast.error(result.data.message);
        }
        console.log(result.data);
      }).catch((error) => {
        toast.error('something went wrong');
        console.log('something went wrong');
      })
    }
  

      
  }

  useEffect(()=> {
    if(formSubmit == true){
      navigation('/viewcourse')
    }
  },[formSubmit])

  let inputHander = (event) => {
    let data = {...input};
    data[event.target.name] = event.target.value;
    setInput(data);
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
            <input type="text" name="course_name" className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2' onChange={ inputHander }  value={ input.course_name }/>
            Courses Price
            <input type="text" name="course_price" className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 ' onChange={ inputHander } value={ input.course_price } />
            Courses Duration
            <input type="text" name="course_duration" className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2' onChange={ inputHander } value={ input.course_duration } />
            Courses Description
            <textarea name="course_description" id="" className='border px-4 pt-3 border-gray-400 my-2 w-full h-[100px]' cols="30" rows="10" onChange={ inputHander } value={ input.course_description}></textarea>

            Courses Order
            <input type="number" name="course_order" className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2' onChange={ inputHander } value={ input.course_order } />

            <input type="file" name='course_image' id='file-input' className='border hidden border-gray-400 w-full h-[50px] mb-3 mt-2 '/>
            <div className='flex items-center gap-0 mt-[80px]'>
              <div className='flex items-center w-full'>
            <input type="text" readOnly placeholder='Upload File' className=' px-4 rounded-[10px_0px_0px_10px] border border-gray-400 w-[70%] h-[50px]' />
            <label id="file-input-label" for="file-input" className='border block  bg-[#4B49AC] text-white text-center leading-[50px]  w-[10%] rounded-[0px_20px_20px_0px] h-[50px]  '>Upload</label>
            </div>
            <div className=''>
              <img src={prev} alt="" width={150} />
            </div>
            </div>
            Courses Stauts
            <div className='flex items-center gap-2 mt-5 mb-8'>
            <input type="radio" name="course_status" value="1" className='mx-2 w-[20px] h-[20px] text-[20px]' onChange={ inputHander }  checked={ (input.course_status == 1) ? 'checked' : '' } /> Active
            <input type="radio" name="course_status" value="0"  className='mx-2 w-[20px] h-[20px] text-[20px]' onChange={ inputHander }  checked={ (input.course_status == 0) ? 'checked' : '' } /> Deactive
            </div>

            {/* <a href='' download="download" target='_blank'></a> */}

            
            <input type="submit" className='bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white' value={ (params.course_id == undefined) ? 'Submit' : 'Update' } />


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