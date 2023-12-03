import React from 'react'
import { useSelector } from 'react-redux'
import { BsCheckCircle } from 'react-icons/bs'
import { MdOndemandVideo } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

export const ViewSubSectionSideBar = ({ section }) => {
    const nagivate = useNavigate()
    const { courseId } = useParams()
    const { subSectionId } = useParams()
    const {
        completedLectures
    } = useSelector((state) => state.viewCourse)

    return (
        <div className='w-full flex flex-col items-start justify-center gap-3'>
            {
                section?.subSection?.map((subSection) => (
                    <div key={subSection._id}
                        onClick={() => nagivate(`/course/${courseId}/section/${section._id}/sub-section/${subSection._id}`)}
                        className={` cursor-pointer w-full flex gap-3 items-start 
                            p-4 transition-all duration-200 text-sm
                        
                        ${subSection._id === subSectionId ? "bg-yellow-800 text-yellow-50" :
                                "text-richblack-25"} `}>

                        <div className='flex gap-2'>
                            <div className='w-4 h-4'>
                                {
                                    completedLectures.includes(subSection._id) &&
                                    <BsCheckCircle fontSize={16} className='text-caribbeangreen-100' />
                                }
                            </div>

                            <div className='w-4 h-4'>
                                <MdOndemandVideo fontSize={16} />
                            </div>
                        </div>

                        <div>
                            <p>{subSection.title}</p>
                        </div>

                    </div>
                ))}
        </div>
    )
}
