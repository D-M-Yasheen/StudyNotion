import toast from 'react-hot-toast';
import { avgRating } from '../utils/avgRating';
import { addToCart } from '../slices/cartSlice';
import { ACCOUNT_TYPE } from '../utils/constants';
import React, { useEffect, useState } from 'react';
import { Modal } from '../components/common/Modal';
import { formatDate } from '../services/formatDate';
import { Footer } from '../components/common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MdLanguage, MdOutlineInfo } from 'react-icons/md';
import { RatingStars } from '../components/common/RatingStars';
import { ShowLecture } from '../components/core/Course/ShowLecture';
import { buyCourse } from '../services/operations/studentFeatureAPI';
import { fetchCourseDetails } from '../services/operations/courseAPI';
import { CourseDetailCard } from '../components/core/Course/CourseDetailCard';

export const AboutCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const [avgRatingStar, setAvgRatingStar] = useState(0)
    const { user } = useSelector((state) => state.profile)
    const [courseDetails, setCourseDetails] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)

    useEffect(() => {
        const ratingStart = avgRating(courseDetails?.ratingAndReviews)
        setAvgRatingStar(ratingStart);
    }, [courseDetails])

    useEffect(() => {
        const fetchCourseFullDetails = async () => {

            setLoading(true)

            const result = await fetchCourseDetails(courseId)
            if (result) {
                setCourseDetails(result?.data);
            }
            setLoading(false)
        }

        if (courseId) {
            fetchCourseFullDetails()
        }
    }, [courseId])


    const handlerBuyCourse = async () => {
        if (token) {
            await buyCourse(token, [courseDetails], user, navigate, dispatch)
            return;
        } else {
            setConfirmationModal({
                text1: "Your are not Logged In",
                text2: "Please login to purchase the course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmationModal(null),
            })
        }
    }

    const handleAddToCart = () => {
        if (token) {

            if (user.accountType === ACCOUNT_TYPE.STUDENT) {
                dispatch(addToCart(courseDetails))
                return
            } else {
                toast.error("You are an Instructor. You can't buy a course.")
                return
            }

        } else {
            setConfirmationModal({
                text1: "Your are not Logged In",
                text2: "Please login to purchase the course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmationModal(null),
            })
        }
    }

    return (
        <div>
            {loading ?
                <div className='w-screen h-screen flex justify-center items-center'>
                    <div className='custom-loader'></div>
                </div>
                :
                <>
                    {/* Heading and Payment Card */}

                    <header className='relative w-full bg-richblack-800'>
                        <div className=' mx-auto lg:w-4/5 w-10/12 flex 
                                flex-col items-start gap-6 py-16'>

                            <div className='flex flex-col gap-4'>
                                <h1 className=' items-stretch text-richblack-5 text-4xl font-bold'>
                                    {courseDetails?.courseName}
                                </h1>

                                <p className='lg:w-1/2 w-full items-stretch text-richblack-200 text-lg font-normal'>
                                    {courseDetails?.courseDescription}
                                </p>

                                {/* Review and Rating */}
                                <div className='flex gap-2 lg:items-center md:items-center items-start lg:flex-row md:flex-row sm:flex-row xs:flex-col flex-col '>

                                    <div className='flex gap-2 justify-center items-center text-yellow-100 font-semibold text-lg'>
                                        <p>{Number.isInteger(avgRatingStar) || 0}</p>
                                        <RatingStars Review_Count={avgRatingStar} />
                                    </div>

                                    <div className='flex gap-2 justify-center items-center text-richblack-25'>
                                        <p>{`(${courseDetails?.ratingAndReviews?.length} reviews)`}</p>
                                        <p>{`${courseDetails?.studentsEnrolled?.length} student(s) enrolled`}</p>
                                    </div>
                                </div>

                                {/* Instructor name */}
                                <p className='text-richblack-5 text-lg'>
                                    {`Created by ${courseDetails?.instructor?.firstName} ${courseDetails?.instructor?.lastName}`}
                                </p>

                                <div className='flex gap-3 lg:flex-row md:flex-row sm:flex-row
                                xs:flex-col flex-col text-start items-start text-richblack-5 text-lg'>

                                    <div className='flex gap-2 justify-center items-center'>
                                        <MdOutlineInfo />
                                        <span>
                                            Created at: {formatDate(courseDetails?.createAt?.toString())}
                                        </span>
                                    </div>

                                    <div className='flex gap-2 justify-center items-center'>
                                        <MdLanguage />
                                        <span>English</span>
                                    </div>

                                </div>
                            </div>

                            {/* course payment card for medium and small screen */}
                            <div className='w-full lg:hidden flex flex-col border-y-[1px] 
                                    border-richblack-500 py-8 gap-6'>

                                <p className=' items-stretch font-bold text-3xl text-richblack-5'>
                                    Rs. {courseDetails?.price}
                                </p>

                                <div className='flex flex-col gap-3'>


                                    <button onClick={courseDetails?.studentsEnrolled.includes(user?._id) ?
                                        () => navigate("/dashboard/enrolled-courses") : handlerBuyCourse}
                                        className='bg-yellow-50 flex py-3 px-6 items-center justify-center rounded-lg 
                                            text-richblack-900 font-medium'>
                                        {courseDetails?.studentsEnrolled.includes(user?._id) ? "Go To Course" : "Buy Now"}
                                    </button>

                                    <>
                                        {!courseDetails?.studentsEnrolled.includes(user?._id) &&
                                            <button onClick={handleAddToCart}
                                                className='flex py-3 px-6 items-center justify-center rounded-lg 
                                                    text-richblack-5 font-medium'>
                                                Add To Cart
                                            </button>
                                        }
                                    </>
                                </div>
                            </div>

                            {/* Course Payment Card for large screen */}

                            <div className='lg:flex hidden absolute xl:right-0 left-[66%] top-8'>
                                <CourseDetailCard courseDetails={courseDetails} handlerBuyCourse={handlerBuyCourse} handleAddToCart={handleAddToCart} />
                            </div>

                        </div>

                    </header>

                    <div className='lg:w-[65%] lg:mx-16 mx-auto w-full flex flex-col 
                            gap-8 py-6 text-richblack-5'>

                        {/* What you will learn */}
                        <section className='mx-auto w-4/5 p-8 flex flex-col items-start
                                    gap-3 border-[1px] border-richblack-700'>

                            <p className=' text-richblack-5 text-3xl font-medium'>
                                What you'll learn
                            </p>

                            <ul className='flex flex-col gap-2'>
                                {
                                    courseDetails?.whatYouWillLearn
                                    &&
                                    courseDetails?.whatYouWillLearn?.split('\r\n').map((data, index) => (
                                        <li key={index}
                                            className='flex justify-start items-start text-richblack-50 
                                                text-sm font-medium gap-2'>

                                            <div className=''>
                                                {"\u2022"}
                                            </div>
                                            <span>
                                                {data}
                                            </span>
                                        </li>
                                    ))
                                }
                            </ul>

                        </section>

                        {/* Course Content */}
                        <section className='mx-auto w-4/5 py-8 flex flex-col items-start gap-4'>
                            <ShowLecture courseContent={courseDetails?.courseContent} />
                        </section>

                        {/* About Instructor */}
                        <section className='mx-auto w-4/5 py-8 flex flex-col items-start
                                    gap-3 text-richblack-5'>

                            <p className=' text-3xl font-semibold'>
                                Author
                            </p>

                            <div className='flex items-center justify-center gap-3'>
                                <img src={courseDetails?.instructor?.image}
                                    className='w-[3.5rem] rounded-full' />

                                <p className=' font-medium text-lg'>
                                    {`${courseDetails?.instructor?.firstName} ${courseDetails?.instructor?.lastName}`}
                                </p>
                            </div>

                            <p className=' text-richblack-400 text-sm'>
                                {courseDetails?.instructor?.additionalDetails?.about}
                            </p>
                        </section>
                    </div >

                    <Footer />

                    {confirmationModal && <Modal modalData={confirmationModal} />}
                </>
            }
        </div>
    )
}
