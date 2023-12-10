import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md"
import { NavLink } from 'react-router-dom';
import { fetchCourseCategories } from '../../services/operations/courseAPI';

export const Catalog = () => {
    const [catalogData, setCatalogData] = useState([])
    const catalogHandler = async () => {
        try {
            const result = await fetchCourseCategories();
            setCatalogData(result)

        } catch (error) {
            // console.log("Error occurred while fetching catalog data : ", error)
        }
    }

    useEffect(() => {

        catalogHandler()

    }, [])

    return (
        <div className={` mt-5 absolute bg-richblack-5 capitalize w-full
                left-[50%] top-[100%] -translate-x-[50%] p-4 flex flex-col gap-2 
                origin-top-left z-10 rounded-lg transition-all duration-[1000ms] 
                group-hover:visible group-hover:opacity-100 group-hover:scale-y-100 
                invisible opacity-0 scale-y-0`}>

            <div className='lg:flex md:flex hidden absolute left-[50%] top-[2px]
                translate-x-[72%] translate-y-[-45%] h-6 w-6 -z-10
                rotate-45 rounded bg-richblack-5'>
            </div>

            {
                catalogData.length > 0 ? (
                    catalogData.map((course) => (
                        <NavLink key={course._id} to={`/catalog/${course.name.split(" ").join("-").toLowerCase()}`}>

                            <div className='flex justify-start items-center w-full 
                                    gap-x-1 px-8 py-4 text-sm text-richblack-900 
                                    leading-6 transition-all duration-200 select-none 
                                    rounded-lg hover:bg-richblack-50 bg-richblack-5
                                    hover:text-richblack-900'>
                                {course.name}
                            </div>
                        </NavLink>

                    ))
                ) :
                    (
                        <span className='flex justify-center items-center w-full 
                                text-base text-richblack-900'>
                            Loading...
                        </span>
                    )
            }
        </div>
    )
}

