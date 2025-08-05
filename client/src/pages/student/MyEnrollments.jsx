import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'
const MyEnrollments = () => {

  const {enrolledCourses , calculateCourseDuration , navigate} = useContext(AppContext)
  const [progressArray , setProgressArray] = useState([
    {lectureComplected : 2 , totalLectures : 4},
    {lectureComplected : 1 , totalLectures : 5},
    {lectureComplected : 3 , totalLectures : 6},
    {lectureComplected : 4 , totalLectures : 4},
    {lectureComplected : 0 , totalLectures : 3},
    {lectureComplected : 5 , totalLectures : 7},
    {lectureComplected : 6 , totalLectures : 8},
    {lectureComplected : 2 , totalLectures : 6},
    {lectureComplected : 4 , totalLectures : 10},
    {lectureComplected : 3 , totalLectures : 5},
    {lectureComplected : 7 , totalLectures : 7},
    {lectureComplected : 1 , totalLectures : 4},
    {lectureComplected : 0 , totalLectures : 2},
    {lectureComplected : 5 , totalLectures : 5},
  ])
  return (
    <>
    <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold'>MyEnrollments</h1>
        <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr className=''>
              <th className='px-4 py-3 font-semibold truncate'>Course</th>
              <th className='px-4 py-3 font-semibold truncate'>Duration</th>
              <th className='px-4 py-3 font-semibold truncate'>Complected</th>
              <th className='px-4 py-3 font-semibold truncate'>Status</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {enrolledCourses.map((course ,index) => (
              <tr key={index} className='border-b border-gray-500/20'>
                <td className='md:px-24 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                  <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28'/>
                  <div className='flex-1'>
                    <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                    <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureComplected * 100) / progressArray[index].totalLectures : 0 }className='bg-gray-300 rounded-full'/>
                  </div>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                  {calculateCourseDuration(course)}
                </td>
                <td className='px-4 py-3 max-sm:hidden'>
                 {progressArray[index] && `${progressArray[index].lectureComplected} / ${progressArray[index].totalLectures}`} <span>Lectures</span>
                </td>
                <td className='px-4 py-3 max-sm:text-right'>
                  <button  onClick={()=> navigate('/player/'+ course._id)}
                  className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white'>
                    {progressArray[index] && progressArray[index].lectureComplected / progressArray[index].totalLectures === 1 ? 'Complected' : 'On Going'} </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    <Footer />
    </>
  )
}

export default MyEnrollments