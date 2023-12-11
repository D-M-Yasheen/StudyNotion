import toast from 'react-hot-toast'
import React, { useEffect, useState } from 'react'
import { Footer } from '../components/common/Footer'
import { ReviewSlider } from '../components/common/ReviewSlider'
import { HomeSection1 } from '../components/core/HomePage/HomeSection1'
import { HomeSection2 } from '../components/core/HomePage/HomeSection2'
import { HomeSection3 } from '../components/core/HomePage/HomeSection3'
import { HomeSection6 } from '../components/core/HomePage/HomeSection6'

export const Home = () => {
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
            }
        </>
    )
}
