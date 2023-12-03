import React from 'react'
import { ProfileImgChange } from './ProfileImgChange';
import { ProfileInfoChange } from './ProfileInfoChange';
import { ChangePassword } from './ChangePassword';
import { DeleteAccount } from './DeleteAccount';

export const Index = () => {

    return (
        <div className='w-11/12 mx-auto flex flex-col gap-10 my-10'>

            {/* Heading */}
            <div className='w-full py-6'>

                <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>

                    Edit Profile

                </h1>

            </div>

            {/* Change User Profile Picture */}
            <ProfileImgChange />

            {/* Change User Information */}
            <ProfileInfoChange />

            {/* Change user Password */}
            <ChangePassword />

            {/* Deleting an user accout */}
            <DeleteAccount />


        </div>
    )
}
