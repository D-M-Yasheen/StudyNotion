import React from 'react'
import studynotionFull from "../../assets/Logo/Logo-Full-Light.png"
import studynotionSmall from "../../assets/Logo/Logo-Small-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { NavLink, Outlet, matchPath, useLocation } from 'react-router-dom'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from 'react-redux'
import { ProfileDropDown } from '../core/Dashboard/ProfileDropDown'
import { Catalog } from './Catalog'


export const NavBar = () => {
    const location = useLocation()
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    const { cart, totalItems } = useSelector((state) => state.cart)

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

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

                        {/* search */}
                        {/* {
                            token &&

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                    <g clipPath="url(#clip0_51832_5367)">
                                        <path d="M19.9388 18.5783L14.9646 13.6041C16.3201 11.9463 16.9866 9.83087 16.8261 7.69543C16.6657 5.55999 15.6906 3.5679 14.1026 2.13123C12.5146 0.694554 10.4351 -0.0767949 8.29429 -0.0232684C6.1535 0.0302581 4.11518 0.904564 2.60093 2.41881C1.08669 3.93305 0.212387 5.97137 0.15886 8.11216C0.105334 10.253 0.876683 12.3324 2.31336 13.9205C3.75003 15.5085 5.74212 16.4836 7.87756 16.644C10.013 16.8044 12.1284 16.138 13.7863 14.7825L18.7604 19.7566C18.9176 19.9084 19.1281 19.9924 19.3466 19.9905C19.5651 19.9886 19.7741 19.901 19.9286 19.7465C20.0831 19.592 20.1708 19.383 20.1727 19.1645C20.1746 18.946 20.0906 18.7355 19.9388 18.5783ZM8.51626 15.0008C7.19772 15.0008 5.90878 14.6098 4.81246 13.8773C3.71613 13.1447 2.86164 12.1035 2.35706 10.8854C1.85248 9.66718 1.72045 8.32673 1.97769 7.03353C2.23492 5.74032 2.86986 4.55243 3.80221 3.62008C4.73456 2.68773 5.92245 2.05279 7.21566 1.79556C8.50886 1.53832 9.84931 1.67035 11.0675 2.17493C12.2857 2.67952 13.3268 3.534 14.0594 4.63033C14.7919 5.72665 15.1829 7.01559 15.1829 8.33413C15.1809 10.1016 14.4779 11.7962 13.2281 13.046C11.9783 14.2958 10.2838 14.9988 8.51626 15.0008Z" fill="#999DAA" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_51832_5367">
                                            <rect width="20" height="20" fill="white" transform="translate(0.183594)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        } */}

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
