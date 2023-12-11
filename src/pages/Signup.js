import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import signupImg from "../assets/Images/signup.webp"
import { Template } from '../components/core/Auth/Template'

export const Signup = () => {
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
                        <Template
                            heading={"Join the millions learning to code with StudyNotion for free"}
                            description={"Build skills for today, tomorrow, and beyond."}
                            highlightDescription={" Education to future-proof your career."}
                            formType={"singup"}
                            btn={"Create Account"}
                            img={signupImg}
                        />
                    </div>
            }
        </>
    )
}
