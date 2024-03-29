import React from 'react'
import * as Icons from "react-icons/vsc"
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

export const SideBarLink = ({ element, showSideBar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const Icon = Icons[element.icon];

  return (
    <div>

      <div className={`w-full text-richblack-300 flex gap-3 px-3 py-2 cursor-pointer
          ${matchPath({ path: element.path }, location.pathname) ?
          "bg-yellow-800 text-yellow-50 border-l-4 border-l-yellow-50" :
          "border-l-4 border-richblack-800"} select-none transition-all duration-200 `}
        onClick={() => navigate(element.path)}>

        <div className='flex items-start justify-start text-2xl'>
          <Icon />
        </div>

        <div className={`${showSideBar ? `w-full text-ellipsis whitespace-nowrap text-start`: 'hidden'}`}>
          {element.name}
        </div>
      </div>
    </div>
  )
}
