import React from 'react'
import { BiEdit } from "react-icons/bi"
import { useSelector } from 'react-redux';
import { EditButton } from './EditButton';
import { useNavigate } from 'react-router-dom';

const month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const MyProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const about = user?.additionalDetails?.about ?? "Write about yourself";
  const DOB = user?.additionalDetails?.DOB ? user?.additionalDetails?.DOB.split("-") : undefined
  const dateOfBirth = DOB ? `${month.at(DOB[1])} ${DOB[2]}, ${DOB[0]}` : "NaN";
  const Detail = ({ text1, text2, children }) => {
    return (
      <div className='w-full flex flex-col flex-wrap' >
        <p className='self-stretch text-richblack-400 text-sm font-normal'>
          {text1 ? text1 : children}
        </p>

        <p className=' text-richblack-5 text-sm font-normal self-stretch'>
          {text2 ? text2 : children}
        </p>
      </div>
    )
  }

  const navigateHandler = () => {
    navigate("/dashboard/setting");
  }


  return (
    <div className='w-11/12 mx-auto flex flex-col gap-10 my-10'>

      {/* Heading */}
      <div className='w-full py-6'>
        <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>
          My Profile
        </h1>
      </div>


      {/* Section 1 */}
      <div className='w-full mx-auto flex flex-wrap items-start justify-between
            py-6 lg:px-12 md:px-8 sm:px-6 px-5 gap-5 rounded-lg border-[1px]
            bg-richblack-800 border-richblack-700'>

        <div className='flex lg:flex-row flex-col gap-3 justify-center lg:items-center
                items-start'>

          <img src={user?.image} width={100} height={100}
            className='rounded-full flex justify-center items-center' />

          <div className='w-fit flex flex-col items-start'>
            <p className='text-richblack-5 font-semibold text-lg'>
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className='text-richblack-300 text-sm font-normal'>
              {user?.email}
            </p>
          </div>
        </div>

        <div onClick={navigateHandler}>
          <EditButton handler={navigateHandler} active={true}>
            <BiEdit fontSize={20} />
            <p className=' text-base font-medium text-richblack-900'>
              Edit
            </p>
          </EditButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className='w-full mx-auto items-center py-6 lg:px-12 md:px-8 sm:px-6 px-5 
              flex flex-col gap-5 flex-wrap bg-richblack-800 rounded-lg border-[1px]
            border-richblack-700 '>

        <div className='flex w-full items-center justify-between flex-wrap pb-6 gap-5'>
          <h1 className='text-richblack-5 text-xl font-semibold'>
            About Yourself
          </h1>

          <div onClick={navigateHandler}>
            <EditButton handler={navigateHandler} active={true}>
              <BiEdit fontSize={20} />
              <p className=' text-base font-medium text-richblack-900'>
                Edit
              </p>
            </EditButton>
          </div>
        </div>

        <div className='w-full flex flex-wrap'>
          <Detail text1={"About"} text2={about} />
        </div>
      </div>

      {/* Section 3 */}
      <div className='w-full mx-auto items-center py-6 lg:px-12 md:px-8 sm:px-6 px-5 
              flex lg:flex-row flex-col lg:gap-5 gap-2 flex-wrap bg-richblack-800 rounded-lg border-[1px]
            border-richblack-700 '>

        <div className='w-full flex flex-col gap-5 flex-wrap'>
          <div className='flex w-full items-center justify-between flex-wrap pb-6 gap-5'>
            <h1 className='text-richblack-5 text-xl font-semibold'>
              Personal Details
            </h1>

            <div onClick={navigateHandler}>
              <EditButton active={true}>
                <BiEdit fontSize={20} />
                <p className=' text-base font-medium text-richblack-900'>
                  Edit
                </p>
              </EditButton>
            </div>
          </div>

          <div className='w-full flex lg:flex-row md:flex-row sm:flex-row flex-col gap-5'>
            <Detail text1={"First Name"} text2={user?.firstName} />

            <Detail text1={"Last Name"} text2={user?.lastName} />
          </div>

          <div className='w-full flex lg:flex-row md:flex-row sm:flex-row flex-col gap-5'>
            <Detail text1={"Email"} text2={user?.email} />

            <Detail text1={"Contact"} text2={user?.additionalDetails?.contact || "NaN"} />
          </div>
          
          <div className='w-full flex lg:flex-row md:flex-row sm:flex-row flex-col gap-5'>
            <Detail text1={"Gender"} text2={user?.additionalDetails?.gender || "NaN" } />

            <Detail text1={"Date of Birth"} >
              {dateOfBirth}
            </Detail>
          </div>
        </div>
      </div>
    </div>
  )
}
