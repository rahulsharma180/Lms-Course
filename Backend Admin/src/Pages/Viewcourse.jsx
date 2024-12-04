import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { click } from '@testing-library/user-event/dist/click';

function Viewcourse() {
  let {changemenu} = useContext(mainContext);

  const [courses, setCourses] = useState([])
  const [status, setStatus] = useState(true)


  // in this case status pass in useeffect 
  // this method call view api again this is bad practice this is old method then and catch 


  // let changeStatus = (id,status) =>{
  //   // console.log(id)
  //   // console.log(!status)
  //   let data = {
  //     id:id,
  //     status:!status
  //   }
  //   axios.put('http://localhost:5007/api/backend/courses/change-status',data)
  //   .then((result)=>{
  //     if(result.data.status==true){
  //       toast.success(result.data.message);
  //       setStatus(!status);
  //     }else{
  //       toast.error(result.data.message)

  //     }
    
  //  })
  //   .catch((error)=>{
  //    toast.error('Something went wrong')
  //   })
  // }



// approach (with async/await): It is more modern, cleaner, and directly updates the courses state list in response to the status change. This makes it more reliable in terms of keeping the frontend in sync with the backend and provides better error handling.


  const changeStatus = async (id, currentStatus) => {
    try {
      const data = { id, status: !currentStatus };
      const result = await axios.put('http://localhost:5007/api/backend/courses/change-status', data);
      if (result.data.status) {
        toast.success(result.data.message);
        setCourses((prev) =>
          prev.map((course) => (course._id === id ? { ...course, status: !currentStatus } : course))
        );
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      toast.error('Failed to change course status.');
    }
  };

  useEffect(() => {
   axios.post('http://localhost:5007/api/backend/courses/view')
   .then((result)=>{
    setCourses(result.data.data);
    setStatus();
  })
   .catch((error)=>{
    toast.error('Something went wrong')
   })
  }, []);
  
  


  return (
    <>
    <div className="relative flex flex-col min-h-screen">
      <ToastContainer />

      <Header />

      <div className="flex flex-1 bg-[#F5F7FF]">
        <Sidebar />

        <div
          className={` ${
            changemenu == true ? "w-[95%]" : "w-[84%]"
          }  px-[30px] py-[50px] bg-[#F5F7FF]`}
        >
          <h1 className="text-[25px] font-[500] mb-[10px]">Course Table</h1>
          <div className="">
            <div className="bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]">
              <table>
                <tr>
                  <th width={20} >S.no</th>
                  <th width={120} >Course Name</th>
                  <th width={120}>Fees</th>
                  <th width={120}>Duration</th>
                  {/* <th>Description</th> */}
                  <th width={120}>Image</th>
                  <th width={80}>Status</th>
                  <th width={220} >Action</th>
                </tr>

                {courses.length > 0 ? (
                  courses.map((data,index) => {
                    return (
                      <tr>
                        <td>{index+1}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>{data.duration}</td>
                        {/* <td>{data.description}</td> */}
                        <td>{data.image}</td>
                        <td>{(data.status==1)?
                        <button onClick={()=>{
                       
                          changeStatus(data._id,data.status)

                        }} className="bg-green-500 text-white px-5 mr-5 py-1">
                        Active
                      </button>
                          :
                          <button onClick={()=>{
                          
                            changeStatus(data._id,data.status)
  
                          }}className="bg-red-400 text-white px-5 py-1">
                            Inactive
                          </button>
                          
                          
                          }</td>
                        <td className="text-center">
                          <button className="bg-green-500 text-white px-5 mr-5 py-1">
                            Edit
                          </button>
                          <button className="bg-red-400 text-white px-5 py-1">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                <td colSpan="7" className="text-center">
                  No Record Found
                </td>
              </tr>
                )}
              </table>
            </div>
          </div>
          
        </div>
      </div>
      <Footer/>
    </div>
   
    </>
  );
  
}

export default Viewcourse