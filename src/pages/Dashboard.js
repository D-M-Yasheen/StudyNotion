import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SideBar } from '../components/core/Dashboard/SideBar'

export const Dashboard = () => {
  const { loading } = useSelector((state) => state.auth)
  const [showSideBar, setShowSideBar] = useState(true)

  if (loading) {
    <div className='flex justify-center items-center h-full w-full'>
      <div class="custom-loader"></div>
    </div>
  }

  return (
    <div className='flex text-white overflow-x-auto'>
      <div className={`h-[100vh] ${!showSideBar ? 'w-[3.25rem]' : 'w-[14rem]'} fixed z-[100]
      transition-all duration-500 `}>
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      </div>

      <div className='w-full flex justify-end'>
        <div className={`${showSideBar ? 'w-[calc(100vw-14rem)]' : 'w-[calc(100vw-3.25rem)]'} transition-all duration-500`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
