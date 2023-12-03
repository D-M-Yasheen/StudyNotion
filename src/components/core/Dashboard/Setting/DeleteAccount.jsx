import React, { useState } from 'react'
import { Modal } from '../../../common/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {deleteProfile} from '../../../../services/operations/settingAPI'

export const DeleteAccount = () => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(null)


    const modalData = {
        text1: "Are You Sure?",
        text2: `Deleting your account will remove all the contain associated with it.`,
        btn1Text: "Delete",
        btn2Text: "Cancel",
        btn1Handler: () => dispatch(deleteProfile(token, navigate)),
        btn2Handler: () => setShowModal(null),
     
    }


    async function handleDeleteAccount() {
        try {
          dispatch(deleteProfile(token, navigate))
        } catch (error) {
        //   console.log("ERROR MESSAGE - ", error.message)
        }
      }


    return (
        <div className=' bg-pink-900 border-pink-700  rounded-lg 
        border-[1px] flex py-6 lg:items-start md:items-center items-center
         w-full  mx-auto gap-5 my-10 pl-12'>


            <div className='flex flex-col gap-2'>

                <div>
                    <h1 className=' text-pink-5 text-lg font-bold'>

                        Delete Account

                    </h1>
                </div>

                <div className='flex lg:flex-row flex-col gap-5 lg:items-center 
                items-start'>

                    <div className='lg:w-1/2 w-11/12 flex flex-col gap-[2px]'>
                        <p className=' text-pink-25 text-sm font-medium '>

                            Would you like to delete account?

                        </p>

                        <p className=' text-pink-25 text-sm font-medium '>

                            This account contains Paid Courses. Deleting your
                            account will remove all the contain associated with it.

                        </p>
                    </div>



                    <div className='w-fit  flex cursor-pointer px-5 py-3 justify-center 
                    items-center gap-2 rounded-full bg-pink-700'
                        onClick={() => setShowModal(modalData)}
                        // onClick={handleDeleteAccount}
                        >

                        <p className='flex text-richblack-5 italic 
                        text-base font-medium'>

                            I want to delete my account.

                        </p>

                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24"
                            viewBox="0 0 22 24" fill="none">
                            <path d="M22 4.5C22 3.67158 21.3285 3 20.5 3H16.724C16.0921 
                            1.20736 14.4007 0.00609375 12.5 0H9.50002C7.59928 0.00609375 
                            5.90789 1.20736 5.27602 3H1.5C0.671578 3 0 3.67158 0 4.5C0 
                            5.32842 0.671578 6 1.5 6H2.00002V18.5C2.00002 21.5376 4.46245 
                            24 7.5 24H14.5C17.5376 24 20 21.5376 20 18.5V6H20.5C21.3285 
                            6 22 5.32842 22 4.5ZM17 18.5C17 19.8807 15.8807 21 14.5 
                            21H7.5C6.1193 21 5.00002 19.8807 5.00002 18.5V6H17V18.5Z"
                                fill="#EF476F" />
                            <path d="M8.5 18C9.32842 18 10 17.3284 10 16.5V10.5C10 
                            9.67158 9.32842 9 8.5 9C7.67158 9 7 9.67158 7 10.5V16.5C7 
                            17.3284 7.67158 18 8.5 18Z" fill="#EF476F" />
                            <path d="M13.5 18C14.3284 18 15 17.3284 15 16.5V10.5C15 
                            9.67158 14.3284 9 13.5 9C12.6716 9 12 9.67158 12 10.5V16.5C12 
                            17.3284 12.6716 18 13.5 18Z" fill="#EF476F" />
                        </svg>

                    </div>

                </div>


            </div>

            {showModal !== null && <Modal modalData={showModal} type={"delete"} />}

        </div>
    )
}
