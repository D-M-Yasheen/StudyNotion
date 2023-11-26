import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';



export const CourseTag = ({ name, register, errors, setValue, getValues }) => {

    const [tags, setTags] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
        if (editCourse) {
            // console.log(course)
            setTags(JSON.parse(course?.tag))
        }

        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, tags)
    }, [tags])



    const addTagHandler = (e) => {

        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();

            const tagValue = e.target.value.trim();

            if (tagValue && !tags.includes(tagValue)) {
                const newTags = [...tags, tagValue]
                setTags(newTags)
                e.target.value = ""
            }
        }
    }

    const removeTagHandler = (index) => {

        const updateTags = tags.filter((data, i) => i !== index &&  data)

        setTags(updateTags)

    }

    return (
        <div className='w-full'>

            <label className='w-full flex flex-col items-start gap-2'>
                <p className='text-richblack-5 text-sm font-normal'>
                    Course Tags
                    <span className='text-pink-200 text-sm font-normal'>*</span>
                </p>

                {
                    tags.length > 0 && (
                        <ul className='w-fit flex gap-2 flex-wrap'>
                            {
                                tags.map((item, index) => (
                                    <li key={index}
                                        className='w-fit flex gap-1 items-center justify-center
                                bg-yellow-100 rounded-full px-2 text-richblack-900
                                text-sm'>
                                        {item}

                                        <button type='button'
                                            onClick={() => removeTagHandler(index)}
                                            className='text-richblack-900'>
                                            <RxCross2 />
                                        </button>

                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

                <input
                    type='text'
                    placeholder='Enter tags'
                    name={name}
                    className=" form-style w-full flex p-3 items-center gap-3 rounded-lg
                         bg-richblack-700 border-b-[2px] border-richblack-500"
                    onKeyDown={addTagHandler}
                />
                {
                    errors[name] && (
                        <span className='text-pink-200 text-xs'>
                            **tag is required
                        </span>
                    )
                }
            </label>

        </div>
    )
}