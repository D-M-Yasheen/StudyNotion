import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCatalogData, fetchCourseCategories } from '../services/operations/courseAPI';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';
import { CourseCard } from '../components/core/Catalog/CourseCard';
import { Footer } from '../components/common/Footer'

export const Catalog = () => {
    const { catalogName } = useParams();
    const [category, setCategory] = useState("");
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [active, setActive] = useState("Most popular")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getCategories = async () => {

            setLoading(true)
            const result = await fetchCourseCategories(catalogName);
            if (result) {
                // console.log("result",result)
                const category_id =
                    result.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0];
                // console.log("catalog Name ", res)
                setCategory(category_id)
                // console.log("category : ", category)

            }
            setLoading(false)
        }
        getCategories();
    }, [catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            setLoading(true)

            // console.log("category id : ", categoryId)

            const result = await fetchCatalogData(category._id);

            if (result) {
                // console.log("seleted category details : ", result)
                setCatalogPageData(result)
                // console.log("Catalog Page Details : ", catalogPageData)
            }

            setLoading(false)
        }
        if (category)
            getCategoryDetails();

    }, [category])

    return (
        <>
            {loading ?
                <div className='w-screen h-screen flex justify-center items-center'>
                    <div className='custom-loader'></div>
                </div>
                :
                <>


                    <header className='w-full flex justify-center items-center bg-richblack-800'>

                        <div className='w-4/5 flex flex-col gap-4 py-16'>

                            <p className=' text-richblack-300 font-normal text-sm'>
                                {"Home / Catalog / "}

                                <span className=' text-yellow-50 font-normal text-sm'>
                                    {category?.name}
                                </span>
                            </p>

                            <h1 className=' items-stretch text-richblack-5 text-3xl font-normal'>
                                {category?.name}
                            </h1>

                            <p className='w-1/2 items-stretch text-richblack-200 text-base font-normal'>
                                {category?.description}
                            </p>

                        </div>

                    </header>


                    <div className='w-4/5 mx-auto py-16 flex-col flex gap-28'>

                        <section className='flex flex-col gap-10'>

                            <div className='flex flex-col gap-2'>

                                <h1 className=' text-richblack-5 font-bold lg:text-4xl md:text-3xl text-2xl'>
                                    Courses to get you started
                                </h1>

                                <div className='flex border-b-[1px] border-richblack-500'>

                                    <button onClick={() => setActive("Most popular")}
                                        className={`${active === "Most popular" && 'text-yellow-50 border-b-[1px] border-yellow-50'}
                                py-2 px-3 text-base font-normal `}>
                                        Most popular
                                    </button>

                                    <button onClick={() => setActive("New")}
                                        className={`${active === "New" && 'text-yellow-50 border-b-[1px] border-yellow-50'}
                                py-2 px-3 text-base font-normal`}>
                                        New
                                    </button>

                                    <button onClick={() => setActive("Trending")}
                                        className={`${active === "Trending" && 'text-yellow-50 border-b-[1px] border-yellow-50'}
                                py-2 px-3 text-base font-normal`}>
                                        Trending
                                    </button>

                                </div>

                            </div>

                            <div>
                                {
                                    catalogPageData?.selectedCourses?.courses ?
                                        <CourseSlider Courses={catalogPageData?.selectedCourses?.courses} />
                                        :
                                        <div>
                                            No Course Available
                                        </div>
                                }
                            </div>

                        </section>


                        <section className='flex flex-col gap-10'>

                            <h1 className=' text-richblack-5 font-bold lg:text-4xl md:text-3xl text-2xl'>
                                Top courses in {category?.name}
                            </h1>

                            <div >
                                {
                                    catalogPageData?.mostSellingCourses ?
                                        <CourseSlider Courses={catalogPageData?.mostSellingCourses} />
                                        :
                                        <div>
                                            No Course Available
                                        </div>
                                }

                            </div>

                        </section>


                        <section className='flex flex-col gap-10'>

                            <h1 className=' text-richblack-5 font-bold lg:text-4xl md:text-3xl text-2xl'>
                                Frequently Brought
                            </h1>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10'>
                                {
                                    catalogPageData?.differentCourses ?

                                        catalogPageData?.differentCourses?.map((course, index) => (
                                            <CourseCard Course={course} key={index} />
                                        ))
                                        :
                                        <div>
                                            No Course Available
                                        </div>

                                }
                            </div>

                        </section>

                    </div>

                    <Footer />

                </>
            }
        </>
    )
}
