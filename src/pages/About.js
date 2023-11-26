import React from 'react'
import { AboutSection1 } from '../components/core/AboutPage/AboutSection1'
import { AboutHeader } from '../components/core/AboutPage/AboutHeader'
import { AboutSection2 } from '../components/core/AboutPage/AboutSection2'
import { AboutSection3 } from '../components/core/AboutPage/AboutSection3'
import { AboutStat } from '../components/core/AboutPage/AboutStat'
import { LearningGrid } from '../components/core/AboutPage/LearningGrid'

import { HighLightText } from '../components/common/HighLightText'
import aboutus1 from "../assets/Images/aboutus1.webp"
import aboutus2 from "../assets/Images/aboutus2.webp"
import aboutus3 from "../assets/Images/aboutus3.webp"
import { Footer } from '../components/common/Footer'
import { ContactUsSection } from '../components/core/AboutPage/ContactUsSection'
import { ReviewSlider } from '../components/common/ReviewSlider'

export const About = () => {
    return (
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
    )
}
