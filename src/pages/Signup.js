import React from 'react'
import signupImg from "../assets/Images/signup.webp"
import { Template } from '../components/core/Auth/Template'

export const Signup = () => {
    return (
        <div className='w-full'>
            <Template
                heading={"Join the millions learning to code with StudyNotion for free"}
                description={"Build skills for today, tomorrow, and beyond."}
                highlightDescription={" Education to future-proof your career."}
                formType={"singup"}
                btn={"Create Account"}
                img={signupImg}
            />
        </div>
    )
}
