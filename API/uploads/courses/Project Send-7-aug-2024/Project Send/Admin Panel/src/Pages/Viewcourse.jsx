import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

function Viewcourse() {
  let {changemenu} = useContext(mainContext);

  let [courses, setCourses] = useState([]);
  let [changeStatusValue, setChangeStatus] = useState(false);
  let [courseIds, setCourseIds] = useState([]);
  let [imagePath, setImagePath] = useState();

  let multipleSelect = (id) => {
    let updateCourseIds = [...courseIds];

    if(updateCourseIds.includes(id)){
      updateCourseIds = updateCourseIds.filter((course_id) => {
          return course_id != id;
      })
    } else {
      updateCourseIds.push(id);
    }

    setCourseIds(updateCourseIds);

  }

  let changeStatus = (id,status) => {
    // console.log(id);
    // console.log(!status);

    const data = {
      id : id,
      status : !status
    }

    axios.put('http://localhost:5005/api/backend/courses/change-status',data).then((result) => {
      if(result.data.status == true){
        toast.success(result.data.message);
        setChangeStatus(!changeStatusValue);
      } else {
        toast.error(result.data.message);
      }
      
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
  }

  let deleteCourse = (course_id) => {
    console.log(course_id);

    let data = {
      id : course_id
    }

    axios.post('http://localhost:5005/api/backend/courses/delete',data)
    .then((result) => {
      if(result.data.status == true){
        toast.success(result.data.message);
        setChangeStatus(!changeStatusValue);
      } else {
        toast.error(result.data.message);
      }
      
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
  }

  let multipleDeleteCourse = () => {

    let data = {
      ids : courseIds
    }

    axios.post('http://localhost:5005/api/backend/courses/multiple-delete',data)
    .then((result) => {
      if(result.data.status == true){
        toast.success(result.data.message);
        setChangeStatus(!changeStatusValue);
      } else {
        toast.error(result.data.message);
      }
      
    })
    .catch(() => {
      toast.error('Something went wrong');
    })
  }

  useEffect(() => {
    axios.post('http://localhost:5005/api/backend/courses/view').then((result) => {
      if(result.data.status == true){
        setImagePath(result.data.imagePath);
        setCourses(result.data.data)
      } else {
        setCourses([])
      }
      
    }).catch((error) => {
      
    })
  },[changeStatusValue]);


  return (
    <div>
    <ToastContainer/>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>
      
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Course Table
        </h1>

        <button className='px-5 py-1 text-white bg-red-400' onClick={ () =>  multipleDeleteCourse() }>Multiple Delete</button>

        <div className=''>
        <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <table >
            <tr>
              <th></th>
              <th width="20">S.no</th>
              <th>Course Name</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Image</th>
              <th width="100">Status</th>
              <th width="220">Action</th>
            </tr>

            {
              (courses.length > 0)

              ? 
                courses.map((data,index) => {
                  return(
                    <tr>
                    <td>
                      <input type="checkbox" onClick={ () => multipleSelect(data._id) }/>
                    </td>
                    <td>{ index+1 }</td>
                    <td>{ data.name }</td>
                    <td>{ data.price }</td>
                    <td>{ data.duration }</td>
                    <td> <img src={imagePath+data.image } width={150} height={150}  /></td>
                    <td>
                      {
                        (data.status == 1)

                        ?
                        <button className='px-5 py-1 mr-5 text-white bg-green-500' onClick={() => changeStatus(data._id,data.status) }>Active</button>
                        :
                        <button className='px-5 py-1 text-white bg-red-400' onClick={() => changeStatus(data._id,data.status) }>Inactive</button>
                      }
                    </td>
                    <td className='text-center'>
                    <Link to={`/addcourse/${data._id}`}>
                    <button className='px-5 py-1 mr-5 text-white bg-green-500'>Edit</button>
                    </Link>
                    <button className='px-5 py-1 text-white bg-red-400' onClick={() => 
                      deleteCourse(data._id)
                    }>Delete</button>


                    </td>
                  </tr>
                  );
                })
              :

              <tr>
                <td>No record found</td>
              </tr>
            }
              
          </table>
        </div>
        </div>
      <Footer/>
      </div>
    </div>

    </div>
  )
}

export default Viewcourse