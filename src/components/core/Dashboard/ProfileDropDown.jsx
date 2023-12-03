import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { logout } from '../../../services/operations/authAPI';
import { useOnClickOutside } from '../../../hook/useOnClickOutside';
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai"

export const ProfileDropDown = () => {
    const ref = useRef(null)
    const userImg = user?.image;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const [showDropDown, setShowDropDown] = useState(false);
    
    useOnClickOutside(ref, () => setShowDropDown(false));

    return (
        <div className='relative cursor-pointer'>

            <div className='flex justify-center items-center gap-x-1'
                ref={ref}>

                <img src={userImg} width={30} height={30} alt=""
                    className='rounded-full relative select-none object-cover'
                    onClick={() => setShowDropDown((prev) => !prev)} />

                <div onClick={() => setShowDropDown((prev) => !prev)}>
                    {
                        showDropDown ?
                            <AiOutlineCaretUp fontSize={20}
                                className=" text-richblack-100" />
                            :
                            <AiOutlineCaretDown fontSize={20}
                                className=" text-richblack-100" />
                    }
                </div>
            </div>

            <div className={`absolute bg-richblack-700 capitalize
                    right-[50%] top-[120%] translate-x-[50%] flex flex-col
                    rounded-xl transition-all duration-500 origin-top-right
                    ${showDropDown ? 'visible opacity-100 scale-y-100' :
                    'invisible opacity-0 scale-y-0'}`}
                ref={ref}
                onClick={(event) => event.stopPropagation()}>

                <NavLink to="/dashboard/my-profile" onClick={() => setShowDropDown((prev) => !prev)}>

                    <button className='flex justify-start items-center w-full 
                                gap-x-1 p-3 text-sm text-richblack-100 
                                transition-all duration-200 select-none rounded-xl
                                hover:bg-richblack-700 hover:text-richblack-25 '>

                        <VscDashboard className='text-lg' />

                        <p> Dashboard </p>

                    </button>

                </NavLink>

                <div className='h-[1px] bg-richblack-700 w-11/12 mx-auto rounded-full'></div>

                <button className='flex items-center w-full gap-x-1 select-none
                            p-3 justify-start text-sm text-richblack-100 
                            transition-all duration-200 hover:bg-richblack-700
                            hover:text-richblack-25 rounded-xl'
                    onClick={() => {
                        dispatch(logout(navigate))
                        setShowDropDown(false)
                    }}>

                    <VscSignOut className='text-lg' />

                    <p> Log Out </p>

                </button>

            </div>

        </div >
    )
}