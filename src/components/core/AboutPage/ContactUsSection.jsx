import React from 'react'
import { ContantUsForm } from '../../common/ContantUsForm'

export const ContactUsSection = () => {
    return (
        <div className='flex flex-col lg:w-[500px] md:w-[500px] sm:w-[500px] 
        mx-auto gap-8'>

            <div className='w-full flex flex-col mx-auto gap-4'>

                <h1 className='text-richblack-5 font-semibold text-4xl text-center self-stretch'>
                    Get in Touch
                </h1>

                <p className='w-4/5 mx-auto text-richblack-300 text-base font-medium text-center self-stretch'>
                    We’d love to here for you, Please fill out this form.
                </p>

            </div>

            <div className=' lg:w-full md:w-11/12 w-4/5 mx-auto'>
                <ContantUsForm />
            </div>

        </div>
    )
}
