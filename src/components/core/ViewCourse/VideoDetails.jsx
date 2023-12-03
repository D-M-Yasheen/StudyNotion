import React, { useEffect, useState } from 'react'
// import '~video-react/styles/scss/video-react';
import { Player } from 'video-react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { markLectureAsComplete } from '../../../services/operations/courseAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';

export const VideoDetails = () => {

  const [videoDetails, setVideoDetails] = useState(null)
  const [videoEnd, setVideoEnd] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { sectionId } = useParams()
  const { subSectionId } = useParams()
  const location = useLocation()
  const { token } = useSelector((state) => state.auth)
  const {
    courseEntireData,
    courseSectionData,
    completedLectures,
    totalNoOfLectures
  } = useSelector((state) => state.viewCourse)


  const getCurrentSectionIndex = () => {

    return courseSectionData?.findIndex((section) => (
      section?._id === sectionId
    ))

  }

  const getCurrentSubSectionIndex = () => {

    const currentSectionIndex = getCurrentSectionIndex();

    return courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((subSection) => (
      subSection?._id === subSectionId
    ))
  }


  const isFirstVideo = () => {
    return (getCurrentSectionIndex() === 0 && getCurrentSubSectionIndex() === 0) ? true : false
  }


  const isLastVideo = () => {

    const totalSection = courseSectionData?.length || 0

    const totalSubSection = courseSectionData[getCurrentSectionIndex()]?.subSection?.length || 0

    return (getCurrentSectionIndex() === totalSection - 1 && getCurrentSubSectionIndex() === totalSubSection - 1) ? true : false

  }


  const goToNext = async () => {

    if (!completedLectures?.includes(subSectionId)) await handleLectureCompletion()

    if (isLastVideo()) return

    const currentSectionIndex = getCurrentSectionIndex()

    const currentSubSectionIndex = getCurrentSubSectionIndex()

    const totalSubSection = courseSectionData[currentSectionIndex]?.subSection?.length

    // console.log("current section index", currentSectionIndex)

    // console.log("current sub section index", currentSubSectionIndex)

    // console.log("total sub section index", totalSubSection)

    if (currentSubSectionIndex !== totalSubSection - 1) {

      const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex + 1]?._id

      navigate(`/course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)

    } else {

      const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id

      const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection?.[0]?._id

      navigate(`/course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }

  }


  const goToPrev = () => {

    if (isFirstVideo()) return;

    const currentSectionIndex = getCurrentSectionIndex()

    const currentSubSectionIndex = getCurrentSubSectionIndex()

    if (currentSubSectionIndex !== 0) {

      const prevSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex - 1]?._id

      navigate(`/course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)

    } else {

      const prevSectionId = courseSectionData?.[currentSectionIndex - 1]?._id

      const totalSubSection = courseSectionData?.[currentSectionIndex - 1]?.subSection?.length

      const prevSubSectionId = courseSectionData?.[currentSectionIndex - 1]?.subSection?.[totalSubSection - 1]?._id

      navigate(`/course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }

  }


  const handleLectureCompletion = async () => {

    setLoading(true)

    const result = markLectureAsComplete({ courseId, subSectionId }, token);

    if (result) {
      dispatch(updateCompletedLectures(subSectionId))
    }

    setLoading(false)

  }


  useEffect(() => {
    ; (() => {

      const currentSectionIndex = getCurrentSectionIndex()

      const currentSubSectionIndex = getCurrentSubSectionIndex()

      setVideoDetails(courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex])

      setVideoEnd(false)

      console.log("video Details are: ", videoDetails)

    })()
  }, [[], location.pathname])


  return (

    <>{
      loading ?
        <div className='w-screen h-screen flex items-center translate-x-[35%]'>
          <div className='custom-loader'></div>
        </div>
        :
        <div>

          <div className=' fixed z-[5] w-[calc(100vw-20rem)] flex p-4 gap-4 
      justify-end flex-wrap lg:items-center items-end bg-richblack-800
       lg:flex-row flex-col h-fit'>

            <div>

              <IconBtn onclick={goToPrev}
                customClasses={`${isFirstVideo() && 'cursor-not-allowed opacity-30'}`}>

                <FaChevronLeft />
                <p>Previous</p>

              </IconBtn>

            </div>



            <div className=''>
              {
                (!isLastVideo() || !completedLectures?.includes(videoDetails?._id)) ?
                  <IconBtn outline={true} onclick={goToNext}>
                    {
                      completedLectures?.includes(videoDetails?._id) ?
                        <p>Next</p>
                        :
                        isLastVideo() ?
                          <p>Mark As Completed</p>
                          :
                          <p>Complete and Continue</p>
                    }
                    <FaChevronRight />
                  </IconBtn>

                  :

                  <IconBtn
                    outline={true}
                    onclick={goToNext}
                    customClasses={' cursor-not-allowed opacity-30'}>

                    <p>Next</p>
                    <FaChevronRight />

                  </IconBtn>

              }
            </div>



          </div>


          <div className='lg:pt-36 pt-44 pb-16'>
            <Player
              src={videoDetails?.videoUrl}
              aspectRatio={'16:9'}
              onEnded={() => setVideoEnd(true)}
            >


            </Player>
          </div>

        </div>
    }
    </>
  )
}
