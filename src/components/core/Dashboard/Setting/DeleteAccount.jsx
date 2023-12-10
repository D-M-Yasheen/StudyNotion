import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { Modal } from '../../../common/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile } from '../../../../services/operations/settingAPI'

export const DeleteAccount = () => {
    const { token } = useSelector((state) => state.auth);
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

    return (
        <div className=' bg-pink-900 border-pink-700  rounded-lg 
                border-[1px] flex py-6 lg:items-start md:items-center items-center
                w-full  mx-auto gap-5 my-10 lg:px-12 md:px-8 sm:px-6 px-5'>

            <div className='flex flex-col gap-2'>
                <div>
                    <h1 className=' text-pink-5 text-lg font-bold'>
                        Delete Account
                    </h1>
                </div>

                <div className='flex lg:flex-row flex-col gap-5 justify-between 
                lg:items-center items-start'>

                    <div className='lg:w-1/2 w-11/12 flex flex-col gap-[2px]'>
                        <p className=' text-pink-25 text-sm font-medium '>
                            Would you like to delete account?
                        </p>

                        <p className=' text-pink-25 text-sm font-medium '>
                            This account contains Paid Courses. Deleting your
                            account will remove all the contain associated with it.
                        </p>
                    </div>

                    <div className='w-fit flex cursor-pointer px-5 py-3 justify-center 
                            items-center gap-2 rounded-full bg-pink-700'
                        onClick={() => setShowModal(modalData)}>

                        <p className='flex text-richblack-5 italic text-base font-medium'>
                            I want to delete my account.
                        </p>

                        <MdDeleteForever className='text-pink-200 text-3xl' />

                    </div>
                </div>
            </div>
            {showModal !== null && <Modal modalData={showModal} type={"delete"} />}
        </div>
    )
}
