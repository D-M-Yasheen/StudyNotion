import { IoHome } from "react-icons/io5";
import { MdSummarize } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import React, { useRef, useState } from 'react';
import { BiSolidCategory } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { logout } from '../../../services/operations/authAPI';
import { useOnClickOutside } from '../../../hook/useOnClickOutside';
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { Catalog } from '../../common/Catalog';

export const ProfileDropDown = () => {
    const ref = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const [showDropDown, setShowDropDown] = useState(false);

    useOnClickOutside(ref, () => setShowDropDown(false));

    return (
        <div className='relative cursor-pointer'>

            <div className='flex justify-center items-center gap-x-1'
                ref={ref}>

                <img src={user?.image} width={30} height={30} alt=""
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
                    right-[80%] top-[120%] translate-x-[50%] flex flex-col
                    rounded-xl transition-all duration-500 origin-top-right
                    ${showDropDown ? 'visible opacity-100 scale-y-100' :
                    'invisible opacity-0 scale-y-0'}`}
                ref={ref}
                onClick={(event) => event.stopPropagation()}>

                <NavLink to="/" onClick={() => setShowDropDown((prev) => !prev)}>

                    <button className='lg:hidden md:hidden flex justify-start items-center w-full 
                                gap-2 px-3 py-2 text-sm text-richblack-100 
                                transition-all duration-200 select-none rounded-xl
                                hover:bg-richblack-700 hover:text-richblack-25 '>

                        <IoHome className='text-lg' />

                        <p> Home </p>

                    </button>

                </NavLink>


                <NavLink to="/dashboard/my-profile" onClick={() => setShowDropDown((prev) => !prev)}>

                    <button className='flex justify-start items-center w-full 
                                gap-2 px-3 py-2 text-sm text-richblack-100 
                                transition-all duration-200 select-none rounded-xl
                                hover:bg-richblack-700 hover:text-richblack-25 '>

                        <VscDashboard className='text-lg' />

                        <p> Dashboard </p>

                    </button>

                </NavLink>

                <button className='relative flex lg:hidden md:hidden justify-start items-center
                            w-full gap-2 px-3 py-2 text-sm text-richblack-100 group
                            transition-all duration-200 select-none rounded-xl
                            hover:bg-richblack-700 hover:text-richblack-25 '>

                    <BiSolidCategory className='text-lg group-hover:rotate-180 transition-all 
                                        duration-200' />

                    <p> Catalog </p>
                    <div className='absolute w-[200px] right-[100%] -top-[200%]'>
                        <Catalog />
                    </div>

                </button>


                <div className='h-[1px] my-1 bg-richblack-600 w-11/12 mx-auto rounded-full'></div>

                <NavLink to="/about" onClick={() => setShowDropDown((prev) => !prev)}>

                    <button className='lg:hidden md:hidden flex justify-start items-center w-full 
                                gap-2 px-3 py-2 text-sm text-richblack-100 
                                transition-all duration-200 select-none rounded-xl
                                hover:bg-richblack-700 hover:text-richblack-25 '>

                        <MdSummarize className='text-lg' />

                        <p> About </p>

                    </button>

                </NavLink>


                <NavLink to="/contact" onClick={() => setShowDropDown((prev) => !prev)}>

                    <button className='lg:hidden md:hidden flex justify-start items-center w-full 
                                gap-2 px-3 py-2 text-sm text-richblack-100 
                                transition-all duration-200 select-none rounded-xl
                                hover:bg-richblack-700 hover:text-richblack-25 '>

                        <IoMdContact className='text-lg' />

                        <p> Contact </p>

                    </button>

                </NavLink>

                <div className='lg:hidden md:hidden flex h-[2px] my-1 bg-richblack-600 w-11/12 mx-auto rounded-full'></div>

                <button className='flex items-center w-full gap-2 select-none
                            px-3 py-2 justify-start text-sm text-richblack-100 
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