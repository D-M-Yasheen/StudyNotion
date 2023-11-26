import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai'
import { SubSectionModal } from './SubSectionModal';
import { Modal } from '../../../../common/Modal';
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseAPI';

export const NestedView = ({ handleChangeEditSectionName }) => {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [showSummary, setShowSummary] = useState(false)
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfrimationModal] = useState(null)

  const len = course?.courseContent.length - 1;

  const deleteSectionHandler = async (sectionId) => {
    console.log("Delete Section ", sectionId)

    const result = await deleteSection({
      sectionId,
      courseId: course._id,
    }, token)

    if (result) {
      const updatedCourse = { ...course, 'courseContent': result.courseContent }
      dispatch(setCourse(updatedCourse));
    }

    setConfrimationModal(null)
  }

  const deleteSubSectionHandler = async (subSectionId, sectionId) => {
    console.log("Delete Section ", subSectionId, sectionId)

    const result = await deleteSubSection({ subSectionId, sectionId }, token);

    if (result) {
      console.log("result ----> ", result)

      const updatedCourseContent = course?.courseContent?.map((section) => (
        section._id === result._id ? result : section
      ))
      const updatedCourse = { ...course, 'courseContent': updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfrimationModal(null)
  }

  return (
    <>

      <div className='w-full lg:px-6 md:px-4 px-2 flex-col rounded-lg
      border-[1px] border-richblack-600 bg-richblack-700'>
        {
          course?.courseContent.map((section, index) => (

            <details open key={section._id}>

              {/* Section Details */}
              <summary
                className={`py-3 flex w-full item-center justify-between gap-3 border-b-[1px] border-richblack-400`}>

                <div className='flex items-center gap-2 w-full lg:text-base md:text-sm text-xs'>

                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clip-path="url(#clip0_11167_21572)">
                        <path d="M20.0013 3.33398H9.16797V5.83398H20.0013V3.33398Z" fill="#6E727F" />
                        <path d="M20.0013 9.16602H9.16797V11.666H20.0013V9.16602Z" fill="#6E727F" />
                        <path d="M20.0013 15H9.16797V17.5H20.0013V15Z" fill="#6E727F" />
                        <path d="M7.5 5.83442L4.41667 2.75108C4.32968 2.66405 4.2264 2.59501 4.11273 2.54791C3.99905 2.50081 3.87721 2.47656 3.75417 2.47656C3.63112 2.47656 3.50928 2.50081 3.3956 2.54791C3.28193 2.59501 3.17865 2.66405 3.09167 2.75108L0 5.83442H2.5V15.0011H0L3.06083 18.0619C3.14713 18.1483 3.24962 18.2169 3.36244 18.2637C3.47526 18.3105 3.5962 18.3345 3.71833 18.3345C3.84047 18.3345 3.9614 18.3105 4.07422 18.2637C4.18704 18.2169 4.28953 18.1483 4.37583 18.0619L7.43667 15.0011H5V5.83442H7.5Z" fill="#6E727F" />
                      </g>
                      <defs>
                        <clipPath id="clip0_11167_21572">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </>
                  <p className='w-full text-richblack-50 font-semibold'>{section.sectionName}</p>

                </div>

                <div className='flex items-center lg:text-xl md:text-base text-sm gap-3
                text-richblack-400'>

                  {/* Edit button */}
                  <button
                  className=''
                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.69338 14.7618L1.43159 17.9163C1.26833 18.3244 1.67337 18.7295 2.08153 18.5662L5.236 17.3044C5.73896 17.1033 6.19582 16.802 6.57886 16.419L17.498 5.50023C18.3265 4.6718 18.3265 3.32865 17.498 2.50023C16.6696 1.6718 15.3265 1.6718 14.498 2.50023L3.57886 13.419C3.19582 13.802 2.89457 14.2589 2.69338 14.7618Z" fill="#6E727F" />
                    </svg>
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => {
                      setConfrimationModal(
                        {
                          text1: "Delete this section",
                          text2: "All the lecture in this course will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => deleteSectionHandler(section._id),
                          btn2Handler: () => setConfrimationModal(null),
                        }

                      )
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <g clip-path="url(#clip0_11167_21577)">
                        <path d="M19.1654 2.5H14.9987V2.08333C14.9987 1.5308 14.7792 1.0009 14.3885 0.610194C13.9978 0.219493 13.4679 0 12.9154 0L7.08203 0C6.5295 0 5.99959 0.219493 5.60889 0.610194C5.21819 1.0009 4.9987 1.5308 4.9987 2.08333V2.5H0.832031V5H2.4987V17.5C2.4987 18.163 2.76209 18.7989 3.23093 19.2678C3.69977 19.7366 4.33566 20 4.9987 20H14.9987C15.6617 20 16.2976 19.7366 16.7665 19.2678C17.2353 18.7989 17.4987 18.163 17.4987 17.5V5H19.1654V2.5ZM14.9987 17.5H4.9987V5H14.9987V17.5Z" fill="#6E727F" />
                        <path d="M9.16797 7.5H6.66797V15H9.16797V7.5Z" fill="#6E727F" />
                        <path d="M13.332 7.5H10.832V15H13.332V7.5Z" fill="#6E727F" />
                      </g>
                      <defs>
                        <clipPath id="clip0_11167_21577">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>


                  {"|"}

                  {/* Drop Down button */}
                  <div className=' cursor-pointer'
                    onClick={() => setShowSummary(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4.16797 7.5H15.8346L10.5905 12.7442C10.4342 12.9004 10.2223 12.9882 10.0013 12.9882C9.78033 12.9882 9.56841 12.9004 9.41214 12.7442L4.16797 7.5Z" fill="#6E727F" />
                    </svg>
                  </div>

                </div>

              </summary>

              {/* SubSection Details */}
              <div className='pl-6'>
                {
                  section?.subSection?.map((data) => (
                    <div key={data._id}
                      className={`py-3 border-b-[1px] border-richblack-400`}>

                      <div className='flex w-full item-center justify-between gap-3'>

                        <div className='flex items-center gap-2 w-full'
                          onClick={() => setViewSubSection(data)}>

                          <>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <g clip-path="url(#clip0_11167_21572)">
                                <path d="M20.0013 3.33398H9.16797V5.83398H20.0013V3.33398Z" fill="#6E727F" />
                                <path d="M20.0013 9.16602H9.16797V11.666H20.0013V9.16602Z" fill="#6E727F" />
                                <path d="M20.0013 15H9.16797V17.5H20.0013V15Z" fill="#6E727F" />
                                <path d="M7.5 5.83442L4.41667 2.75108C4.32968 2.66405 4.2264 2.59501 4.11273 2.54791C3.99905 2.50081 3.87721 2.47656 3.75417 2.47656C3.63112 2.47656 3.50928 2.50081 3.3956 2.54791C3.28193 2.59501 3.17865 2.66405 3.09167 2.75108L0 5.83442H2.5V15.0011H0L3.06083 18.0619C3.14713 18.1483 3.24962 18.2169 3.36244 18.2637C3.47526 18.3105 3.5962 18.3345 3.71833 18.3345C3.84047 18.3345 3.9614 18.3105 4.07422 18.2637C4.18704 18.2169 4.28953 18.1483 4.37583 18.0619L7.43667 15.0011H5V5.83442H7.5Z" fill="#6E727F" />
                              </g>
                              <defs>
                                <clipPath id="clip0_11167_21572">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                          </>

                          <p className='w-full text-richblack-50 text-base font-semibold'>
                            {data.title}
                          </p>

                        </div>

                        <div className='flex items-center text-xl gap-3 text-richblack-400'>

                          {/* Edit button */}
                          <button
                            onClick={() => setEditSubSection({ ...data, sectionId: section._id })}
                          >

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M2.69338 14.7618L1.43159 17.9163C1.26833 18.3244 1.67337 18.7295 2.08153 18.5662L5.236 17.3044C5.73896 17.1033 6.19582 16.802 6.57886 16.419L17.498 5.50023C18.3265 4.6718 18.3265 3.32865 17.498 2.50023C16.6696 1.6718 15.3265 1.6718 14.498 2.50023L3.57886 13.419C3.19582 13.802 2.89457 14.2589 2.69338 14.7618Z" fill="#6E727F" />
                            </svg>

                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => {
                              setConfrimationModal(
                                {
                                  text1: "Delete this SubSection",
                                  text2: "All the lecture in this Section will be deleted",
                                  btn1Text: "Delete",
                                  btn2Text: "Cancel",
                                  btn1Handler: () => deleteSubSectionHandler(data._id, section._id),
                                  btn2Handler: () => setConfrimationModal(null),
                                }

                              )
                            }}
                          >

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <g clip-path="url(#clip0_11167_21577)">
                                <path d="M19.1654 2.5H14.9987V2.08333C14.9987 1.5308 14.7792 1.0009 14.3885 0.610194C13.9978 0.219493 13.4679 0 12.9154 0L7.08203 0C6.5295 0 5.99959 0.219493 5.60889 0.610194C5.21819 1.0009 4.9987 1.5308 4.9987 2.08333V2.5H0.832031V5H2.4987V17.5C2.4987 18.163 2.76209 18.7989 3.23093 19.2678C3.69977 19.7366 4.33566 20 4.9987 20H14.9987C15.6617 20 16.2976 19.7366 16.7665 19.2678C17.2353 18.7989 17.4987 18.163 17.4987 17.5V5H19.1654V2.5ZM14.9987 17.5H4.9987V5H14.9987V17.5Z" fill="#6E727F" />
                                <path d="M9.16797 7.5H6.66797V15H9.16797V7.5Z" fill="#6E727F" />
                                <path d="M13.332 7.5H10.832V15H13.332V7.5Z" fill="#6E727F" />
                              </g>
                              <defs>
                                <clipPath id="clip0_11167_21577">
                                  <rect width="20" height="20" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                          </button>

                        </div>

                      </div>

                    </div>
                  ))
                }

              </div>

              {/* Add SubSection Button */}
              <button
                className='text-yellow-50 text-base font-medium flex items-center gap-1 py-4'
                onClick={() => setAddSubSection(section._id)}
              >
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 10.5H13.5V6H10.5V10.5H6V13.5H10.5V18H13.5V13.5H18V10.5Z" fill="#FFD60A" />
                  </svg>
                </>
                Add Lecture

              </button>

            </details>

          ))
        }
      </div>

      {
        addSubSection ?
          <SubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
          /> :
          viewSubSection ?
            <SubSectionModal
              modalData={viewSubSection}
              setModalData={setViewSubSection}
              view={true}
            /> :
            editSubSection ?
              <SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
              /> :
              <></>
      }

      {
        confirmationModal &&
        <Modal modalData={confirmationModal} type="logout" />
      }



    </>
  )
}
