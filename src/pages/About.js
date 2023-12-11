import toast from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { Footer } from '../components/common/Footer'
import { ReviewSlider } from '../components/common/ReviewSlider'
import { AboutStat } from '../components/core/AboutPage/AboutStat'
import { AboutHeader } from '../components/core/AboutPage/AboutHeader'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'
import { AboutSection1 } from '../components/core/AboutPage/AboutSection1'
import { AboutSection2 } from '../components/core/AboutPage/AboutSection2'
import { AboutSection3 } from '../components/core/AboutPage/AboutSection3'
import { ContactUsSection } from '../components/core/AboutPage/ContactUsSection'

export const About = () => {
    const [loading, setLoading] = useState(true);
    (() => {
        if (loading) {
            var toastId = toast.loading('Loading...')
        }
        else {
            toast.dismiss(toastId)
        }
    })();
    useEffect(() => {
        setLoading(false)
    }, [])
    return (
        <>
            {
                loading ?
                    <div className='h-0'></div>
                    :
                    <div className='w-full'>

                        {/* About Page Header */}
                        <AboutHeader />

                        {/* About Page Section 1 */}
                        <AboutSection1 />

                        {/* About Page Section 2 */}
                        <AboutSection2 />

                        {/* About Page Section 3 */}
                        <AboutSection3 />

                        {/* About Page Stat */}
                        <AboutStat />

                        {/* About Page LearningGrid */}
                        <LearningGrid />

                        {/* About Page ContactFrom 1 */}
                        <ContactUsSection />

                        {/* About Page Review */}
                        <ReviewSlider />

                        {/* About Page Footer */}
                        <Footer />

                    </div>
            }</>
    )
}
