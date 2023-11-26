import React from 'react'
import loginImg from "../assets/Images/login.webp"
import { Template } from '../components/core/Auth/Template'

export const Login = () => {
    return (
        <div className='w-full mt-24'>
            <Template
                heading={"Welcome Back"}
                description={"Build skills for today, tomorrow, and beyond."}
                highlightDescription={" Education to future-proof your career."}
                formType={"login"}
                btn={"Sign in"}
                img={loginImg}
            />
        </div>

    )
}
