import React from 'react'
import { NavLink } from 'react-router-dom'

export const CTAButton = ({
    children,
    active,
    linkto
}) => {
    return (
        <NavLink to={linkto}>
            <button className={`text-center text-base px-6 py-3 rounded-md
                        font-bold hover:scale-95 border-r-[2px] transition-all 
                        duration-200 border-b-[2px] ${active ?`bg-[#FFD60A] 
                        text-black border-yellow-5`:`bg-richblack-800 
                        border-richblack-500`}`}>
                {children}
            </button>
        </NavLink>
    )
}
