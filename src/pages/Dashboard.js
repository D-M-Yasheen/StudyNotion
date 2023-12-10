import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SideBar } from '../components/core/Dashboard/SideBar'
import { CustomLoader } from '../components/common/CustomLoader'

export const Dashboard = () => {
  const { loading } = useSelector((state) => state.auth)
  const { editCourse } = useSelector((state) => state.course);
  const [showSideBar, setShowSideBar] = useState(false)

  if (loading) {
    <CustomLoader />
  }

  return (
    <div className='flex text-white overflow-x-auto'>
      <div className={`h-[100vh] fixed z-10 transition-all duration-200 
               ${!showSideBar ? 'w-[3.25rem]' : 'w-[14rem]'}`}>
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      </div>

      <div className='w-full flex justify-end'>
        <div className={`${showSideBar ? 'w-[calc(100vw-16rem)]' : 'w-[calc(100vw-4rem)]'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
