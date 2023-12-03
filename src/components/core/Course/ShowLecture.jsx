import React, { useEffect, useState } from 'react'
import { SectionDetails } from './SectionDetails';

export const ShowLecture = ({ courseContent }) => {

    const [allActiveSections, setAllActiveSections] = useState([])
    const handleAllActiveSection = (id) => {

        setAllActiveSections(allActiveSections?.includes(id) ?
            allActiveSections.filter((i) => i !== id) :
            [...allActiveSections, id])
    }
    const [totalLectures, setTotalLectures] = useState(0)
    const [totalSection, setTotalSection] = useState(0)

    useEffect(() => {

        setTotalSection(courseContent?.length || 0)
        let total = 0;
        courseContent?.forEach((section) => (total += section?.subSection?.length || 0))
        setTotalLectures(total);
    }, [courseContent])

    return (
        <>
            <div className=' w-full flex flex-col gap-2 '>

                <h1 className=' text-2xl font-semibold'>
                    Course Content
                </h1>

                <div className='flex justify-between items-center gap-3'>

                    <p className=' text-sm text-richblack-50'>
                        {`${totalSection} section(s) • ${totalLectures} lecture(s) • NaN h NaN m total length`}
                    </p>

                    <button
                        className='text-yellow-50 text-sm font-medium'
                        onClick={() => setAllActiveSections([])}>

                        Collapse all sections

                    </button>
                </div>
            </div>
            <div className='w-full'>
                {
                    courseContent?.map((section) => (
                        <SectionDetails
                            key={section._id}
                            sectionDetails={section}
                            allActiveSections={allActiveSections}
                            setAllActiveSections={setAllActiveSections}
                            handleAllActiveSection={handleAllActiveSection}
                        />
                    ))
                }
            </div>
        </>
    )
}
