import React, { useState } from 'react'
import { sidebarLinks } from "../../../data/dashboard-links"
import { SideBarLink } from './SideBarLink'
import { useDispatch, useSelector } from 'react-redux'
import { VscSignOut } from 'react-icons/vsc'
import { Navigate, useNavigate } from 'react-router-dom'
import { Modal } from '../../common/Modal'
import { logout } from '../../../services/operations/authAPI'
import { HiChevronDoubleRight, HiChevronDoubleLeft, HiChevronLeft, HiChevronRight } from "react-icons/hi";


export const SideBar = ({ showSideBar, setShowSideBar }) => {
    const { user } = useSelector((state) => state.profile)
    const [showModal, setShowModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className={`relative h-full w-full bg-richblack-800 
        flex flex-col items-start gap-3 py-6 `}>

            <div className='w-full flex justify-end'>
                <button className={`w-fit flex justify-end items-center px-3 py-4 
                            cursor-pointer select-none transition-all duration-500
                            font-extrabold text-blue-100 text-2xl animate-trans-right
                            `}
                    onClick={() => setShowSideBar((prev) => !prev)}>
                    {
                        !showSideBar ?
                            <div className='flex'>
                                <HiChevronRight className='translate-x-9' />
                                <HiChevronRight className='translate-x-5' />
                                <HiChevronRight className='translate-x-1' />
                                {/* <HiChevronDoubleRight /> */}
                            </div>
                            :
                            <div className='flex'>
                                <HiChevronLeft className='translate-x-8'/>
                                <HiChevronLeft className='translate-x-4'/>
                                <HiChevronLeft className='translate-x-0'/>
                                {/* <HiChevronDoubleLeft  /> */}
                            </div>
                    }

                </button>
            </div>

            <div className='w-full'>
                {
                    sidebarLinks.map((element) => {
                        if (element?.type && user.accountType !== element.type) return null;
                        return (
                            <SideBarLink key={element.id} element={element} showSideBar={showSideBar} />
                        )
                    })
                }
            </div>


            <div className='w-11/12 flex h-[1px] mx-auto my-3 gap-3 
            self-stretch bg-richblack-600'>
            </div>

            <div className='w-full'>
                <SideBarLink element={
                    {
                        name: "Setting",
                        icon: "VscGear",
                        path: "/dashboard/setting"
                    }

                } showSideBar={showSideBar} />


                <div
                    // className='w-full text-richblack-300 border-l-4
                    //  border-richblack-800 flex px-6 py-2 justify-center 
                    //  items-center gap-3 cursor-pointer select-none '
                    className={`w-full text-richblack-300 flex gap-3 px-3 py-2 cursor-pointer
                     select-none transition-all duration-200 border-l-4 border-richblack-800 `}
                    onClick={() => setShowModal({
                        text1: "Are You Sure?",
                        text2: "You will be log out.",
                        btn1Text: "Log Out",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setShowModal(null)
                    })}>

                    <div className='flex items-start justify-start text-2xl'>

                        <VscSignOut />

                    </div>

                    <div className={`${showSideBar ? `w-full text-ellipsis whitespace-nowrap
                                    text-start`: 'hidden'}`}>

                        Log Out

                    </div>

                </div>

            </div>


            {
                (showModal !== null) && <Modal modalData={showModal} type={"logout"} />

            }
        </div >
    )
}
