import React from 'react'
import { BsUpload } from "react-icons/bs"
import { EditButton } from '../EditButton'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../../slices/profileSlice';
import { updateProfilePic } from '../../../../services/operations/settingAPI';

export const ProfileImgChange = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const uploadImgHandler = async (data) => {
        try {
            const formData = new FormData();
            formData.append("displayPicture", data.file[0])
            dispatch(updateProfilePic(token, formData)).then(() => {
                setLoading(false);
                reset();
            })
        } catch (error) {
            // console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <div className='w-full flex lg:flex-row md:flex-row flex-col bg-richblack-800 
            mx-auto lg:px-12 md:px-8 sm:px-6 px-5 py-6 gap-5 rounded-lg border-[1px]
            border-richblack-700 lg:items-center md:items-center items-start'>

            <img src={user?.image} width={100} height={100}
                className='rounded-full flex justify-center items-center' />

            <div className='w-full flex flex-col items-start gap-3'>

                <h1 className='text-richblack-5 text-xl font-semibold'>
                    Change Profile Picture
                </h1>

                <form onSubmit={handleSubmit(uploadImgHandler)}
                    className='w-full flex lg:flex-row flex-col gap-5 text-richblack-300'>

                    <div className='relative flex flex-col gap-3 w-full'>
                        <input
                            type='file'
                            id="chooseFile"
                            accept='image/jpg, image/jpng, image/png'

                            {...register("file", {
                                required: {
                                    value: true,
                                    message: "*file is required"
                                }
                            })} />

                        <label htmlFor='chooseFile'
                            className='w-fit absolute -top-[1px] -left-[1px] flex justify-center 
                                items-center rounded-md px-2 py-1 gap-2 border-[1px]
                                border-yellow-25 bg-yellow-50 text-richblack-900'>
                            Choose File
                        </label>
                    </div>

                    <div className='w-full h-fit flex gap-5 lg:justify-end'>
                        <EditButton type={"submit"} active={true}
                            className='flex justify-center items-center'>
                            <p>Upload</p>
                            <BsUpload />
                        </EditButton>

                        <EditButton type={"reset"} active={false}>
                            Cancel
                        </EditButton>
                    </div>
                </form>
            </div>

        </div>
    )
}
