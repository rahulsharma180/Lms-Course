import React, { useContext, useEffect, useState } from 'react';
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function Viewcourse() {
  const { changemenu } = useContext(mainContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5007';

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${API_BASE_URL}/api/backend/courses/view`);
      setCourses(result.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, currentStatus) => {
    try {
      const data = { id, status: !currentStatus };
      const result = await axios.put(`${API_BASE_URL}/api/backend/courses/change-status`, data);
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
    fetchCourses();
  }, []);

  return (
    <div className="relative">
      <ToastContainer />
      <Header />
      <div className="flex bg-[#F5F7FF]">
        <Sidebar />
        <div
          className={`${
            changemenu ? 'w-[95%]' : 'w-[84%]'
          } px-[30px] py-[50px] h-[92vh] bg-[#F5F7FF]`}
        >
          <h1 className="text-[25px] font-[500] mb-[10px]">Course Table</h1>
          <div className="bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th width="20">S.no</th>
                    <th width="120">Course Name</th>
                    <th width="120">Fees</th>
                    <th width="120">Duration</th>
                    <th width="120">Image</th>
                    <th width="80">Status</th>
                    <th width="220">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length > 0 ? (
                    courses.map((data, index) => (
                      <tr key={data._id}>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>{data.duration}</td>
                        <td>{data.image}</td>
                        <td>
                          <button
                            onClick={() => changeStatus(data._id, data.status)}
                            className={`px-5 py-1 text-white ${
                              data.status ? 'bg-green-500' : 'bg-red-400'
                            }`}
                          >
                            {data.status ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="text-center">
                          <button className="bg-green-500 text-white px-5 mr-5 py-1">
                            Edit
                          </button>
                          <button className="bg-red-400 text-white px-5 py-1">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Record Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Viewcousrse;
