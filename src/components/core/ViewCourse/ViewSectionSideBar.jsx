import { useState } from 'react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IoIosArrowForward } from 'react-icons/io'
import { useLocation, useParams } from 'react-router-dom'
import { ViewSubSectionSideBar } from './ViewSubSectionSideBar'

export const ViewSectionSideBar = () => {
    const location = useLocation()
    const { sectionId } = useParams()
    const [activeStatus, setActiveStatus] = useState(null)
    const [allActiveSections, setAllActiveSections] = useState([])
    const handleAllActiveSection = (id) => {
        setAllActiveSections(allActiveSections?.includes(id) ?
            allActiveSections.filter((i) => i !== id) :
            [...allActiveSections, id])
    }
    const {
        courseEntireData,
        courseSectionData
    } = useSelector((state) => state.viewCourse)

    useEffect(() => {
        ; (() => {
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
            // const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data) => (data._id === subSectionId))

            setAllActiveSections([...allActiveSections, sectionId])
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
        })()

    }, [location.pathname])

    return (
        <div className='w-full flex flex-col gap-3 pb-6'>
            {
                courseEntireData?.courseContent?.map((section) => (
                    <div key={section._id}>
                        <div className='text-richblack-5 font-medium px-2 flex-1 
                                py-4 flex items-baseline gap-4 border-b-[1px] 
                                border-richblack-600 bg-richblack-700'
                            onClick={() => handleAllActiveSection(section._id)}>

                            <p className={`cursor-pointer  transition-all duration-200 ${allActiveSections?.includes(section._id) ? 'rotate-90' : 'rotate-0'}`}>
                                <IoIosArrowForward fontSize={18} />
                            </p>

                            <p>
                                {section?.sectionName}
                            </p>
                        </div>

                        {
                            allActiveSections?.includes(section._id) &&
                            <div className='pt-3'>
                                <ViewSubSectionSideBar section={section} />
                            </div>
                        }
                    </div>
                ))}

        </div>
    )
}
