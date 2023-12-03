import React from 'react'
import { Footer } from '../components/common/Footer'
import { ReviewSlider } from '../components/common/ReviewSlider'
import { HomeSection1 } from '../components/core/HomePage/HomeSection1'
import { HomeSection2 } from '../components/core/HomePage/HomeSection2'
import { HomeSection3 } from '../components/core/HomePage/HomeSection3'
import { HomeSection6 } from '../components/core/HomePage/HomeSection6'

export const Home = () => {
    return (
        <div className=' mt-14 w-full mx-auto'>

            {/* Section 1 */}
            <HomeSection1 />

            {/* Section 2 */}
            <HomeSection2 />

            {/* Section 3 */}
            <HomeSection3 />

            {/* Section 3 */}
            <HomeSection6 />

            <ReviewSlider />

            {/* Footer Section */}
            <Footer />

        </div>
    )
}
