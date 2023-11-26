import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/core/Dashboard/SideBar'
import { useSelector } from 'react-redux'
import { NavBar } from "../components/common/NavBar"

export const Dashboard = () => {
  const { loading } = useSelector((state) => state.auth)

  if (loading) {
    <div className='flex justify-center items-center h-full w-full'>
      <div class="custom-loader"></div>
    </div>
  }

  return (
    <div className='flex text-white overflow-x-hidden overflow-y-auto'>


      <div className='h-[100vh] w-[14rem] fixed'>

        <SideBar />

      </div>

      <div className='w-full flex justify-end'>
        <div className='w-[calc(100vw-14rem)]'>

          <Outlet />


        </div>
      </div>
    </div>
  )
}
