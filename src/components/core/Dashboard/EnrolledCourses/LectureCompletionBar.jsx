import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";

export const LectureCompletionBar = ({ course, courseId, completedVideo }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        ; (() => {
            let totalLecture = 0
            course.forEach((section) => (
                totalLecture += section.subSection.length
            ))
            const completedLecture = completedVideo?.filter((id) => id.courseId === courseId)?.[0]?.completedVideos?.length
            const percent = Math.round((completedLecture / totalLecture) * 100)
            setProgress(percent)
        })()

    }, [])

    return (
        <div>
            <div className='flex flex-col items-center justify-center gap-2'>
                <p className='text-richblack-100 text-sm font-medium '>
                    {`Progress:${progress || 0}%`}
                </p>

                <ProgressBar completed={progress}
                    height={8}
                    width={100}
                    baseBgColor='#2C333F'
                    isLabelVisible={false}
                    bgColor={`${progress <= 40 ? '#E7C009' : progress <= 80 ? '#47A5C5' : '#06D6A0'}`}
                />
            </div>
        </div>
    )
}
