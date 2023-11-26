import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { HiOutlineVideoCamera } from 'react-icons/hi2'

export const SectionDetails = ({
    sectionDetails,
    allActiveSections,
    setAllActiveSections,
    handleAllActiveSection }) => {

    // console.log("sectio id : ", sectionDetails._id)
    // const contentEl = useRef(null)

    // // Accordian state
    // const [active, setActive] = useState(false)
    // useEffect(() => {
    //     setActive(activeStatus?.includes(key))
    //     console.log("active : ", activeStatus)
    // }, [activeStatus])

    // const [sectionHeight, setSectionHeight] = useState(0)
    // useEffect(() => {
    //     // setSectionHeight(active ? contentEl.current.scrollHeight : 0)
    // }, [active])




    const [totalSubSection, setTotalSubSection] = useState(0);


    useEffect(() => {
        // setActiveStatus()
        let total = 0;
        setTotalSubSection(sectionDetails?.subSection?.length || 0)
    }, [sectionDetails])

    return (
        <div className='w-full text-sm border-[1px] border-richblack-500'>

            <div className='w-full'
                >

                <div className='w-full justify-between items-center bg-richblack-700 
                            flex py-4 px-8 border-richblack-600'
                            onClick={() => handleAllActiveSection(sectionDetails?._id)}>

                    <div className='w-11/12 flex justify-start items-center gap-2'>

                        <div>
                            <FaAngleDown fontSize={20} className={`transition-all duration-200 ${allActiveSections?.includes(sectionDetails._id) && '-rotate-180'}`}/>
                        </div>

                        <p className='capitalize text-richblack-5 font-medium'>
                            {sectionDetails?.sectionName}
                        </p>

                    </div>

                    <div className='w-full flex justify-end items-center gap-3'>

                        <p className=' text-yellow-50'>
                            {totalSubSection} lectures
                        </p>


                    </div>
                </div>

                <div>
                    {allActiveSections?.includes(sectionDetails._id) &&
                        sectionDetails?.subSection?.map((subSection, subSectionId) => (
                            <details key={subSectionId} className='w-full mx-auto'>

                                <summary className='flex gap-3 items-start justify-between py-4 px-8 '>

                                    <div className='flex gap-2 items-start justify-start'>

                                        <div className='flex flex-col gap-1'>

                                            <div className='flex gap-2 items-center'>

                                                <HiOutlineVideoCamera fontSize={18} />

                                                <p className='text-richblack-5 font-medium capitalize'>
                                                    {subSection?.title}
                                                </p>


                                            </div>

                                            <p className='px-6 text-richblack-50'>
                                                {subSection?.description}
                                            </p>

                                        </div>

                                    </div>

                                </summary>

                            </details>
                        ))
                    }
                </div>

            </div>

        </div>
    )
}
