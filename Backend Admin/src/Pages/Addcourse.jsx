import React, { useContext, useEffect, useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
// import DashboardItems from '../Common/DashboardItems'  
import Footer from "../Common/Footer";
import { mainContext } from "../Context";
import prev from "../img/generic-image-file-icon-hi.png";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { toFormData } from "axios";

// import AdminForms from '../Common/AdminForms'

function Addcourse() {
  let { changemenu } = useContext(mainContext);

  let params = useParams();

  let navigate = useNavigate();

  const [input, setInput] = useState({
    course_name: "",
    course_price: "",
    course_duration: "",
    course_description: "",
    course_image: "",
    course_status: "",
    course_order: "",
  });
 
  let submitHandler = (event) => {
    event.preventDefault();

    let form = new FormData(event.target);
    console.log(form)
    // Jo data ham bhej rhe uske key name or database m key k name same hone chaiye
    // tb toFormData kam karega

    // let dataSave = {
    //   name: event.target.course_name.value,
    //   image: event.target.course_name.value,
    //   price: event.target.course_price.value,
    //   duration: event.target.course_duration.value,
    //   description: event.target.course_description.value,
    //   order: event.target.course_order.value,
    //   status: event.target.course_status.value,
    // };

// idr hamne database se key match karne k liye dataSave ko re define kiya h
// nhi to ham apne code mai name= "" ko rename krna pdata database k according-**************
    let dataSave = {
      name: form.get('course_name'),
      price: form.get('course_price'),
      // image : form.get('course_image'),
      duration: form.get('course_duration'),
      description:form.get('course_description'),
      order: form.get('course_order'),
      status: form.get('course_status'),
    };

      if(form.get('course_image')!=''){
        dataSave.image = form.get('course_image');
      }
    if (params.course_id == undefined) {
      axios.post('http://localhost:5007/api/backend/courses/add',toFormData(dataSave))

      // axios.post("http://localhost:5007/api/backend/courses/add", dataSave)
        .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message);
            //
            

            setTimeout(() => {
              navigate("/viewcourse");
            }, 3000);
          } else {
            toast.error(result.data.message);
          }
          //
        })
        .catch((error) => {
          toast.error("server not working !!");
        });
    } else {
      // dataSave.id = params.course_id;
      // axios.put('http://localhost:5007/api/backend/courses/update',toFormData(dataSave)) // in case of body id 
      // axios.put("http://localhost:5007/api/backend/courses/update/"+params.course_id,dataSave)
      axios.put("http://localhost:5007/api/backend/courses/update/"+params.course_id,toFormData(dataSave)) // in case of params id 
      .then((result) => {
          if (result.data.status == true) {
            toast.success(result.data.message,{autoClose: 2000});

            //

            setTimeout(() => {
              navigate("/viewcourse");
            }, 3000);
          } else {
            toast.error(result.data.message,{autoClose: 2000});
          }
          //
        })
        .catch((error) => {
          toast.error("server not working !!");
        });
    }
    console.log("hello");
  };
  useEffect(() => {
    if (params.course_id === undefined) {
      // Reset the form fields when in "Add Course" mode
      setInput({
        course_name: "",
        course_price: "",
        course_duration: "",
        course_description: "",
        course_image: "",
        course_status: "",
        course_order: "",
      });
    } else {
      // Fetch data for edit mode
      axios
        .post(
          "http://localhost:5007/api/backend/courses/details/" + params.course_id
        )
        .then((result) => {
          console.log(result.data);
          setInput({
            course_name: result.data.data.name,
            course_price: result.data.data.price,
            course_duration: result.data.data.duration,
            course_description: result.data.data.description,
            course_image: result.data.data.image,
            course_status: result.data.data.status,
            course_order: result.data.data.order,
          });
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    }
  }, [params.course_id]);
  
  // useEffect(() => {
  //   if (params.course_id != undefined) {
  //     console.log(params.course_id);

  //     axios
  //       .post(
  //         "http://localhost:5007/api/backend/courses/details/" +
  //           params.course_id
  //       )
  //       .then((result) => {
  //         console.log(result.data);
  //         setInput({
  //           course_name: result.data.data.name,
  //           course_price: result.data.data.price,
  //           course_duration: result.data.data.duration,
  //           course_description: result.data.data.description,
  //           course_image: result.data.data.image,
  //           course_status: result.data.data.status,
  //           course_order: result.data.data.order,
  //         });
  //       })
  //       .catch((error) => {
  //         toast.error("Something went wrong");
  //       });
  //   }
  // }, []);

  let inputHandler = (event) => {
    let data = { ...input };
    data[event.target.name] = event.target.value;
    setInput(data);
  };

  return (
    <div>
      <Header />
      <ToastContainer />

      <div className="flex  bg-[#F5F7FF]">
        <Sidebar />

        <div
          className={` ${
            changemenu == true ? "w-[95%]" : "w-[84%]"
          } relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}
        >
          <h1 className="text-[25px] font-[500] mb-[10px]">Courses</h1>
          <div className="">
            <div className="bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]">
              <form onSubmit={submitHandler}>
                Courses Name
                <input
                  type="text"
                  name="course_name"
                  onChange={inputHandler}
                  value={input.course_name}
                  className="border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 "
                />
                Courses Price
                <input
                  type="text"
                  name="course_price"
                  onChange={inputHandler}
                  value={input.course_price}
                  className="border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 "
                />
                Courses Duration
                <input
                  type="text"
                  name="course_duration"
                  onChange={inputHandler}
                  value={input.course_duration}
                  className="border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 "
                />
                Courses Description
                <textarea
                  id=""
                  name="course_description"
                  onChange={inputHandler}
                  value={input.course_description}
                  className="border px-4 pt-3 border-gray-400 my-2 w-full h-[100px]"
                  cols="30"
                  rows="10"
                ></textarea>
                Courses Order
                <input
                  type="text"
                  name="course_order"
                  onChange={inputHandler}
                  value={input.course_order}
                  className="border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 "
                />
                {/* <input
                  type="file"
                  id="file-input"
                  className="border hidden border-gray-400 w-full h-[50px] mb-3 mt-2 "
                /> */}
                 <input type="file" name='course_image' id='file-input' className='border hidden border-gray-400 w-full h-[50px] mb-3 mt-2 '/>
                <div className="flex items-center gap-0 mt-[80px]">
                  <div className="w-full flex items-center">
                    <input
                    name="course_image"
                    type = 'text'
                    readOnly
                    placeholder="Upload File"
                      className=" px-4 rounded-[10px_0px_0px_10px] border border-gray-400 w-[70%] h-[50px]"
                    />
                    <label
                      id="file-input-label"
                      for="file-input"
                      className="border block  bg-[#4B49AC] text-white text-center leading-[50px]  w-[10%] rounded-[0px_20px_20px_0px] h-[50px]  "
                    >
                      Upload
                    </label>
                  </div>
                  <div className="">
                    <img src={prev} alt="" width={150} />
                  </div>
                </div>
                Courses Stauts
                <div className="flex items-center mt-5  mb-8 gap-2">
                  <input
                    type="radio"
                    name="course_status"
                    onChange={inputHandler}
                    value="1"
                    className="mx-2 w-[20px] h-[20px] text-[20px]"
                    checked={input.course_status == 1 ? "checked" : ""}
                  />{" "}
                  Active
                  <input
                    type="radio"
                    name="course_status"
                    onChange={inputHandler}
                    value="0"
                    className="mx-2 w-[20px] h-[20px] text-[20px]"
                    checked={input.course_status == 0 ? "checked" : ""}
                  />{" "}
                  Deactive
                </div>
                <input
                  type="submit"
                  className="bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white"
                  value={params.course_id == undefined ? "Submit" : "Update"}
                />
                <input
                  type="reset"
                  value="Cancel"
                  className="bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black"
                />
              </form>
            </div>
          </div>
          <Footer className />
        </div>
      </div>
    </div>
  );
}

export default Addcourse;
