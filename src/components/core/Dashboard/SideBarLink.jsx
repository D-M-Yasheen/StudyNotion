import React from 'react'
import * as Icons from "react-icons/vsc"
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { Modal } from '../../common/Modal';

export const SideBarLink = ({ element, flag, showSideBar }) => {
  const Icon = Icons[element.icon];
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>

      <div className={`w-full text-richblack-300 flex gap-3 px-3 py-2 cursor-pointer
                      ${matchPath({ path: element.path }, location.pathname) ?
          "bg-yellow-800 text-yellow-50 border-l-4 border-l-yellow-50" :
          "border-l-4 border-richblack-800"} select-none transition-all duration-200 `}
        onClick={() => navigate(element.path)}
      >

        <div className='flex items-start justify-start text-2xl'>

          <Icon />

        </div>

        <div className={`${showSideBar ? `w-full text-ellipsis whitespace-nowrap
         text-start transition-all duration-500`: 'hidden'}`}>

          {element.name}

        </div>

      </div>

    </div>
  )
}
