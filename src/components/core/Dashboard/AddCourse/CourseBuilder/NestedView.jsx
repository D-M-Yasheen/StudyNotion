import React, { useState } from 'react'
import { RxDropdownMenu } from "react-icons/rx";
import { FiEdit2 } from "react-icons/fi";

import { Modal } from '../../../../common/Modal';
import { SubSectionModal } from './SubSectionModal';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseAPI';
import { MdDelete } from 'react-icons/md';
import { FaCaretDown, FaPlus } from "react-icons/fa";


export const NestedView = ({ handleChangeEditSectionName }) => {

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth)
  const [showSummary, setShowSummary] = useState(false)
  const { course } = useSelector((state) => state.course);
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfrimationModal] = useState(null);
  const deleteSectionHandler = async (sectionId) => {
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
    const result = await deleteSubSection({ subSectionId, sectionId }, token);

    if (result) {
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

                <div className='flex items-center gap-2 w-full lg:text-base md:text-sm 
                text-xs text-richblack-50'>

                  <div>
                    <RxDropdownMenu fontSize={24} />
                  </div>

                  <p className='w-full  font-semibold'>
                    {section.sectionName}
                  </p>

                </div>

                <div className='flex items-center lg:text-xl md:text-base text-sm gap-3
                text-richblack-400'>

                  {/* Edit button */}
                  <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>

                    <div>
                      <FiEdit2 fontSize={20} />
                    </div>
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
                        })
                    }}>

                    <div>
                      <MdDelete fontSize={24} />
                    </div>
                  </button>

                  {"|"}

                  {/* Drop Down button */}
                  <div className=' cursor-pointer'
                    onClick={() => setShowSummary(true)}>
                    <div>
                      <FaCaretDown fontSize={24} />
                    </div>
                  </div>
                </div>
              </summary>

              {/* SubSection Details */}
              <div className='pl-6'>
                {
                  section?.subSection?.map((data) => (
                    <div key={data._id}
                      className={`py-3 border-b-[1px] border-richblack-400`}>

                      <div className='flex w-full item-center justify-between gap-3 text-richblack-50'>

                        <div className='flex items-center gap-2 w-full text-richblack-50'
                          onClick={() => setViewSubSection(data)}>

                          <div>
                            <RxDropdownMenu fontSize={24} />
                          </div>

                          <p className='w-full text-base font-semibold'>
                            {data.title}
                          </p>

                        </div>

                        <div className='flex items-center text-xl gap-3 text-richblack-400'>

                          {/* Edit button */}
                          <button onClick={() =>
                            setEditSubSection({ ...data, sectionId: section._id })}>

                            <div>
                              <FiEdit2 fontSize={20} />
                            </div>
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
                                })
                            }}>
                            <div>
                              <MdDelete fontSize={24} />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>

              {/* Add SubSection Button */}
              <button
                className='text-yellow-50 text-base font-medium flex 
                items-center gap-1 py-4'
                onClick={() => setAddSubSection(section._id)}>

                <div>
                  <FaPlus />
                </div>

                Add Lecture
              </button>
            </details>

          ))
        }
      </div>

      <div>
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
      </div>
      {
        confirmationModal &&
        <Modal modalData={confirmationModal} type="logout" />
      }
    </>
  )
}
