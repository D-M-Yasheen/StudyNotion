import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { BsArrowLeft } from "react-icons/bs"
import { GoCheckCircleFill } from "react-icons/go"
import { MdRadioButtonUnchecked } from "react-icons/md"
import { useLocation, useNavigate } from 'react-router-dom'
import { updatePassword } from '../services/operations/authAPI'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const element = [
    {
        id: 1,
        title: "one lowercase character"
    },
    {
        id: 2,
        title: "one uppercase character"
    },
    {
        id: 3,
        title: "one numerical character"
    },
    {
        id: 4,
        title: "one special character"
    },
    {
        id: 5,
        title: "minimum 8 characters"
    }
]

export const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [miniCheck, setMiniCheck] = useState(false)
    const [lowerCheck, setLowerCheck] = useState(false)
    const [upperCheck, setUpperCheck] = useState(false)
    const [numberCheck, setNumberCheck] = useState(false)
    const [specialCheck, setSpecialCheck] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function passwordHandler(event) {
        setPassword(event.target.value)

        const regLow = /[a-z]/
        const regUp = /[A-Z]/
        const regNum = /[0-9]/
        const regSpe = /[^A-Za-z 0-9]/;

        if (regLow.test(password)) setLowerCheck(true);
        else setLowerCheck(false);

        if (regUp.test(password)) setUpperCheck(true);
        else setUpperCheck(false);

        if (regNum.test(password)) setNumberCheck(true);
        else setNumberCheck(false);

        if (regSpe.test(password)) setSpecialCheck(true);
        else setSpecialCheck(false);

        if (password.length >= 8) setMiniCheck(true);
        else setMiniCheck(false);
    }

    const submitHandler = () => {
        if (password !== confirmPassword) {
            toast.error("Password not matched");
            return;
        }
        const token = location.pathname.split("/").at(-1);
        dispatch(updatePassword(password, confirmPassword, token, setPasswordUpdated));
    }

    return (
        <div className='w-[500px] mt-8 mx-auto'>
            <div className='w-full flex flex-col justify-start items-center p-8 gap-y-9'>
                <div className='w-full flex flex-col gap-y-3'>
                    <h1 className='text-start text-richblack-5 font-semibold text-3xl'>
                        {!passwordUpdated ?
                            'Choose  new password' :
                            "Reset complete!"
                        }
                    </h1>

                    <p className='text-start text-richblack-100 text-lg font-normal'>
                        {
                            !passwordUpdated ?
                                "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                                "All done! We have sent an email to m***********@gmail.com to confirm"
                        }
                    </p>
                </div>

                <div className='w-full flex flex-col gap-y-3'>
                    {!passwordUpdated &&
                        <div className='w-full mb-3'>
                            <form className='w-full'>
                                <div className='flex flex-col gap-y-8'>

                                    {/* Create Password */}
                                    <label className='w-full flex flex-col gap-1'>

                                        <div className='w-full flex'>
                                            <p className='text-sm font-normal text-richblack-5 
                                                    flex items-center gap-1'>
                                                Create Password
                                                <span className='mx-[2px] text-pink-200 text-sm'>
                                                    *
                                                </span>
                                            </p>
                                        </div>

                                        <div className='w-full flex relative '>
                                            <input
                                                type={showPassword ? "text" : 'password'}
                                                value={password}
                                                name='password'
                                                placeholder='Enter Password'
                                                className='w-full text-richblack-200 font-medium
                                                     text-base p-3 border-b-2 border-richblack-400
                                                    bg-richblack-800 rounded-lg'
                                                onChangeCapture={(event) => passwordHandler(event)}
                                            />

                                            {showPassword ?
                                                <div className={`text-richblack-300 absolute 
                                                    right-3 top-[50%] -translate-y-[50%]`}
                                                    onClick={() => setShowPassword(false)}>

                                                    <AiOutlineEye fontSize={24} />

                                                </div>
                                                :
                                                <div className='text-richblack-300 absolute right-3 
                                                        top-[50%] -translate-y-[50%]'
                                                    onClick={() => setShowPassword(true)}>
                                                    <AiOutlineEyeInvisible fontSize={24} />
                                                </div>
                                            }
                                        </div>
                                    </label>

                                    {/* Confirm Password */}
                                    <label className='w-full flex flex-col gap-1'>

                                        <p className='text-sm font-normal text-richblack-5'>
                                            Confirm Password
                                            <span className='mx-[2px] text-pink-200 text-sm'>
                                                *
                                            </span>
                                        </p>

                                        <div className='flex relative '>
                                            <input
                                                type={showConfirmPassword ? "text" : 'password'}
                                                value={confirmPassword}
                                                name='confirmPassword'
                                                placeholder='Enter Password'
                                                onChange={(event) => setConfirmPassword(event.target.value)}
                                                className='w-full text-richblack-200 font-medium
                                                     text-base p-3 border-b-2 border-richblack-400
                                                    bg-richblack-800 rounded-lg'/>

                                            {
                                                showConfirmPassword ?

                                                    <div className={`text-richblack-300 absolute right-3 
                                                            top-[50%] -translate-y-[50%] `}
                                                        onClick={() => setShowConfirmPassword(false)}
                                                    >
                                                        <AiOutlineEye fontSize={24} />

                                                    </div>
                                                    :
                                                    <div className='text-richblack-300 absolute right-3 
                                                            top-[50%] -translate-y-[50%]'
                                                        onClick={() => setShowConfirmPassword(true)}
                                                    >

                                                        <AiOutlineEyeInvisible fontSize={24} />

                                                    </div>
                                            }
                                        </div>
                                    </label>
                                </div>
                            </form>

                        </div>
                    }
                    {!passwordUpdated &&
                        <div className='w-full'>
                            <ul className='w-full grid grid-cols-2 gap-x-3 gap-y-1 place-items-start'>
                                {/* Number check */}
                                <li className='flex justify-center
                                    items-center gap-x-2
                                     font-normal text-xs 
                                   text-richblack-100'>
                                    {
                                        lowerCheck ?
                                            <div className=' text-caribbeangreen-300'>
                                                <GoCheckCircleFill />
                                            </div> :
                                            <MdRadioButtonUnchecked />
                                    }
                                    <p>{element[0].title}</p>
                                </li>

                                {/* Lower Check */}
                                <li className='flex justify-center
                                    items-center gap-x-2
                                     font-normal text-xs 
                                   text-richblack-100'>
                                    {
                                        upperCheck ?
                                            <div className=' text-caribbeangreen-300'>
                                                <GoCheckCircleFill />
                                            </div> :
                                            <MdRadioButtonUnchecked />
                                    }
                                    <p>{element[1].title}</p>

                                </li>

                                {/* Upper Check */}
                                <li className='flex justify-center
                                    items-center gap-x-2
                                     font-normal text-xs 
                                   text-richblack-100'>
                                    {
                                        numberCheck ?
                                            <div className=' text-caribbeangreen-300'>
                                                <GoCheckCircleFill />
                                            </div> :
                                            <MdRadioButtonUnchecked />
                                    }
                                    <p>{element[2].title}</p>

                                </li>

                                {/* Special Check */}
                                <li className='flex justify-center
                                    items-center gap-x-2
                                     font-normal text-xs 
                                   text-richblack-100'>
                                    {
                                        specialCheck ?
                                            <div className=' text-caribbeangreen-300'>
                                                <GoCheckCircleFill />
                                            </div> :
                                            <MdRadioButtonUnchecked />
                                    }
                                    <p>{element[3].title}</p>

                                </li>

                                {/* Mini 8 Check */}
                                <li className='flex justify-center
                                    items-center gap-x-2
                                     font-normal text-xs 
                                   text-richblack-100'>
                                    {
                                        miniCheck ?
                                            <div className=' text-caribbeangreen-300'>
                                                <GoCheckCircleFill />
                                            </div> :
                                            <MdRadioButtonUnchecked />
                                    }
                                    <p>{element[4].title}</p>
                                </li>
                            </ul>
                        </div>
                    }
                </div>

                <div className='w-full flex flex-col gap-y-3'>

                    <button type='submit'
                        className='text-center w-full bg-yellow-50 
                            text-richblack-9 p-3 mx-auto rounded-lg'
                        onClick={!passwordUpdated?submitHandler : ()=>navigate("/login")}>

                        <p className='text-richblack-900 font-medium text-base'>
                            {
                                !passwordUpdated ?
                                    "Reset Password" :
                                    "Return login"
                            }
                        </p>
                    </button>

                    <button className='flex items-center
                            p-3 gap-x-2 font-medium text-base  text-richblack-5'
                        onClick={() => navigate("/login")}>

                        <BsArrowLeft />
                        <p>
                            Back
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}
