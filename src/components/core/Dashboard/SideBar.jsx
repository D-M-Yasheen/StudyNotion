import React, { useState } from 'react'
import { sidebarLinks } from "../../../data/dashboard-links"
import { SideBarLink } from './SideBarLink'
import { useDispatch, useSelector } from 'react-redux'
import { VscSignOut } from 'react-icons/vsc'
import { Navigate, useNavigate } from 'react-router-dom'
import { Modal } from '../../common/Modal'
import { logout } from '../../../services/operations/authAPI'

export const SideBar = () => {
    const { user } = useSelector((state) => state.profile)
    const [showModal, setShowModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className={`relative h-full w-full bg-richblack-800 
        flex flex-col items-start gap-3 py-6 `}>

            <div className='w-full'>
                {
                    sidebarLinks.map((element) => {
                        if (element?.type && user.accountType !== element.type) return null;
                        return (
                            <SideBarLink key={element.id} element={element} />
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
                } />


                <div className='w-full text-richblack-300 border-l-4
                 border-richblack-800 flex px-6 py-2 justify-center 
                 items-center gap-3 cursor-pointer select-none '
                    onClick={() => setShowModal({
                        text1:"Are You Sure?",
                        text2:"You will be log out.",
                        btn1Text:"Log Out",
                        btn2Text:"Cancel",
                        btn1Handler:()=>dispatch(logout(navigate)),
                        btn2Handler:() => setShowModal(null)
                    })}>

                    <div className=''>

                        <VscSignOut />

                    </div>

                    <div className='w-full'>

                        Log Out

                    </div>

                </div>

            </div>


            {
                (showModal !== null) && <Modal modalData={showModal} type={"logout"}/>

            }
        </div >
    )
}
