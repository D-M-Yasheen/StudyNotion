import React from 'react'
import { Catalog } from './Catalog'
import { useSelector } from 'react-redux'
import { NavbarLinks } from "../../data/navbar-links"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { ProfileDropDown } from '../core/Dashboard/ProfileDropDown'
import studynotionFull from "../../assets/Logo/Logo-Full-Light.png"
import studynotionSmall from "../../assets/Logo/Logo-Small-Light.png"
import { NavLink, Outlet, matchPath, useLocation } from 'react-router-dom'


export const NavBar = () => {
    const location = useLocation()
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    const { cart, totalItems } = useSelector((state) => state.cart)
    const matchRoute = (route) => matchPath({ path: route }, location.pathname)

    return (
        <>
            <div className=' fixed z-10 w-full border-b-[1px]
             bg-richblack-800 border-richblack-700 select-none'>

                <div className='lg:w-11/12 w-full justify-between 
                text-richblack-800 px-6 flex mx-auto py-3'>

                    {/* Study Notion Full image */}
                    <div className='lg:flex md:flex sm:flex hidden 
                    items-center justify-center lg:w-1/4'>
                        <NavLink to="/">
                            <img src={studynotionFull}
                                width={160}
                                height={32}
                            />
                        </NavLink>
                    </div>

                    {/* Study Notion Small image */}
                    <div className='lg:hidden md:hidden sm:hidden flex 
                    items-center justify-center lg:w-1/4'>
                        <NavLink to="/">
                            <img src={studynotionSmall}
                                width={32}
                                height={32}
                            />
                        </NavLink>
                    </div>

                    {/* Nav bar */}
                    <nav className='items-center lg:flex md:flex hidden lg:w-3/4 justify-center'>

                        <ul className='flex font-normal text-base
                            text-richblack-25 lg:w-full items-center justify-center'>
                            {
                                NavbarLinks.map((element, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {
                                                element.title === "Catalog" ?
                                                    <div>
                                                        <Catalog />
                                                    </div>
                                                    :
                                                    <NavLink to={element.path}>
                                                        <li className={`py-1 px-3
                                                    ${matchRoute(element.path) ? "text-yellow-50" : "text-richblack-25"}`}>
                                                            {element.title}
                                                        </li>
                                                    </NavLink>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }

                        </ul>
                    </nav>

                    {/* Login / signup / cart / dashboard */}
                    <div className='flex justify-center lg:w-1/4 gap-x-4 items-center'>

                        {/* login */}
                        {
                            !token &&

                            <NavLink to="/login">

                                <button className='border border-richblack-700
                                            bg-richblack-800 px-3 text-center
                                            py-2 text-richblack-100 rounded-md'>

                                    Log in

                                </button>

                            </NavLink>
                        }

                        {/* signup */}
                        {
                            !token &&

                            <NavLink to="/signup">

                                <button className='border border-richblack-700
                                            bg-richblack-800 px-3 text-center
                                            py-2 text-richblack-100 rounded-md'>
                                    Sign up
                                </button>
                            </NavLink>
                        }

                        {/* cart */}
                        {
                            cart && user?.accountType === "Student" &&

                            <NavLink to="/dashboard/cart">

                                <div className='relative'>
                                    <AiOutlineShoppingCart fontSize={24} className='relative text-richblack-100' />

                                    <div className={`absolute  rounded-full top-[50%] left-[50%]
                                        ${totalItems > 0 ? `px-[6px] py-[2px] bg-richblack-600
                                         animate-bounce`
                                        : 'hidden'}`}>

                                        <p className='text-yellow-50 text-xs font-semibold'>
                                            {totalItems}
                                        </p>
                                    </div>

                                </div>

                            </NavLink>
                        }

                        {/* DropDownMenu */}
                        {
                            token &&

                            <div className=''>

                                <ProfileDropDown />

                            </div>
                        }
                    </div>

                </div>

            </div>

            <Outlet />
        </>
    )
}
