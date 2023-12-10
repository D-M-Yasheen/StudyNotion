import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form'
import { RxCross1 } from 'react-icons/rx'
import IconBtn from "../../../../common/IconBtn"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { CourseThumbnail } from '../CourseInfo/CourseThumbnail';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseAPI';

export const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false
}) => {

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (edit || view) {
      setValue("lectureTitle", modalData?.title);
      setValue("lectureVideo", modalData?.videoUrl);
      setValue("lectureDescription", modalData?.description);
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDescription !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl) {
      return true
    }
    else
      return false
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (isFormUpdated()) {
        handleEditSubSection(data)
      } else {
        toast.error("No changes make to the form")
      }
      return
    }

    const formData = new FormData();
    formData.append("courseId", course._id)
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("videoFile", data.lectureVideo)
    formData.append("description", data.lectureDescription)

    setLoading(true)
    const result = await createSubSection(formData, token)

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === result._id ? result : section)
      const updatedCourse = { ...course, 'courseContent': updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const handleEditSubSection = async (data) => {

    const currentValues = getValues;

    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title)
      formData.append("title", data.lectureTitle)

    if (currentValues.lectureDescription !== modalData.description)
      formData.append("description", data.lectureDescription)

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", data.lectureVideo)
    }

    setLoading(true)

    const result = await updateSubSection(formData, token)

    if (result) {
      const updatedCourseContent = course?.courseContent.map((section) =>
        section._id === result._id ? result : section)
      const updatedCourse = { ...course, 'courseContent': updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }


  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen 
          place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>

      <div className='my-10 w-[40rem] max-w-[40rem] border-[1px] 
              shadow-lg shadow-richblack-600 border-richblack-700 rounded-lg'>

        <div className='flex justify-between items-center rounded-t-lg 
                w-full gap-3 px-6 py-4 bg-richblack-700 border-b-[2px]
              border-richblack-600'>

          <p className='text-white text-lg font-semibold'>
            {view ? "Viewing"
              : edit ? "Editing"
                : add ? "Adding" : ""}
            {" Lecture"}
          </p>

          <button onClick={() => { !loading && setModalData(null) }}>
            <RxCross1 fontSize={24} />
          </button>

        </div>

        <form onSubmit={handleSubmit(onSubmit)}
          className='w-full'>

          <div className='w-full flex flex-col p-6 items-start gap-6
            border-richblack-700 bg-richblack-800'>

            {/* Lecture Video */}
            <CourseThumbnail

              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            >

            </CourseThumbnail>

            {/* Lecture Title */}
            <label className='w-full flex flex-col items-start gap-2'>
              <p className='text-richblack-5 text-sm font-normal'>
                Lecture Title
                <span className='text-pink-200 text-sm font-normal'>*</span>
              </p>

              <input
                type='text'
                placeholder='Enter Lecture title'
                className="w-full flex p-3 items-center gap-3 rounded-lg
                         bg-richblack-700 border-b-[2px] border-richblack-500"

                {...register("lectureTitle", {
                  required: {
                    value: true,
                    message: "**title is required",
                  },
                  maxLength: {
                    value: 200,
                    message: "**title is too long"
                  },
                  minLength: {
                    value: 5,
                    message: "**title is too short"
                  }
                })} />
              {
                errors.lectureTitle &&
                <span className='text-pink-200 text-xs'>{errors.lectureTitle.message}</span>
              }
            </label>

            {/* Lecture Description */}
            <label className='w-full flex flex-col items-start gap-2'>
              <p className='text-richblack-5 text-sm font-normal'>
                Lecture Description
                <span className='text-pink-200 text-sm font-normal'>*</span>
              </p>
              <textarea
                placeholder='Enter Lecture Description'
                className="w-full flex p-3 items-center gap-3 rounded-lg
                     bg-richblack-700 border-b-[2px] border-richblack-500"

                {...register("lectureDescription", {
                  required: {
                    value: true,
                    message: "**description is required"
                  }
                })}>
              </textarea>
              {
                errors.lectureDescription &&
                <span className='text-pink-200 text-xs'>{errors.lectureDescription.message}</span>
              }
            </label>

            {/* Save / SaveEdit Button */}

            <div className='w-full gap-5 justify-end flex'>
              {
                !view && (
                  <div className='w-fit'>
                    <IconBtn
                      type="Submit"
                      text={loading ? "Loading..." : edit ? "Save Change" : "Save"}
                      outline={true}>
                    </IconBtn>
                  </div>
                )
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
