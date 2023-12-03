import React, { useEffect, useState } from 'react'
import { CartTable } from './CartTable'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart } from '../../../../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { buyCourse } from '../../../../services/operations/studentFeatureAPI'

export const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { cart, totalItems, total } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false)

    const handlerBuyNow = async () => {
        if (token) {
            setLoading(true)
            await buyCourse(token, cart, user, navigate, dispatch)
            setLoading(false)
        }
    }

    return (
        <>{
            loading ?
                <div className='w-full h-screen flex justify-center items-center'>
                    <div className='custom-loader'></div>
                </div>
                :
                <div className='w-11/12 mx-auto flex flex-col gap-10 my-10'>

                    {/* Heading */}
                    <div className='flex gap-2 justify-between py-6'>

                        <h1 className=' text-richblack-5 font-medium text-3xl tracking-wider'>

                            Cart

                        </h1>
                    </div>

                    {/* Table heading */}
                    <div className='pb-3 items-stretch text-richblack-400 text-base 
                        font-semibold border-b-[1px] border-richblack-400'>
                        {`${totalItems} Courses in Cart`}
                    </div>

                    {/* Main content */}
                    <>
                        {
                            totalItems <= 0 ?
                                <div className='flex justify-center items-center text-richblack-100
                        text-3xl text-center'>
                                    Your cart is empty
                                </div>
                                :
                                <div className='flex lg:flex-row flex-col justify-between gap-10'>

                                    {/* For small screen */}
                                    <>
                                        {
                                            <div className='max-w-[20rem] h-fit lg:hidden flex flex-col p-6 gap-4 rounded-lg bg-richblack-800
                                                border-[1px] border-richblack-700 items-start'>

                                                <div className='flex flex-col gap-1 items-start'>
                                                    <p className=' text-sm font-semibold text-richblack-200'>
                                                        Total:
                                                    </p>
                                                    <p className=' text-yellow-50 font-semibold text-2xl'>
                                                        Rs. {total}
                                                    </p>
                                                </div>
                                                <button onClick={handlerBuyNow}
                                                    className='w-full px-6 py-3 bg-yellow-50 rounded-lg items-center justify-center flex
                                                text-richblack-900 text-base font-medium'>
                                                    Buy Now
                                                </button>

                                            </div>
                                        }
                                    </>

                                    <div className='w-full flex flex-col py-6 gap-8'>
                                        {
                                            cart.map((course, index) => (
                                                <div key={index}>
                                                    <CartTable  course={course} />
                                                    <>
                                                        {
                                                            index < cart.length - 1 &&
                                                            <div className='border-b-[1px] border-richblack-400'></div>
                                                        }
                                                    </>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    {/* For large screen */}
                                    <>
                                        {
                                            <div className='min-w-[18rem] h-fit hidden lg:flex flex-col p-6 gap-4 rounded-lg bg-richblack-800
                                                border-[1px] border-richblack-700 items-start'>

                                                <div className='flex flex-col gap-1 items-start'>
                                                    <p className=' text-sm font-semibold text-richblack-200'>
                                                        Total:
                                                    </p>
                                                    <p className=' text-yellow-50 font-semibold text-2xl'>
                                                        Rs. {total}
                                                    </p>
                                                </div>
                                                <button onClick={handlerBuyNow}
                                                    className='w-full px-6 py-3 bg-yellow-50 rounded-lg items-center justify-center flex
                                                text-richblack-900 text-base font-medium'>
                                                    Buy Now
                                                </button>

                                            </div>
                                        }
                                    </>

                                </div>
                        }

                    </>


                </div>
        }
        </>
    )
}
