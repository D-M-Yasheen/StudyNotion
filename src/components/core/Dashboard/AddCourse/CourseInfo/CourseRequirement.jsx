import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'

export const CourseRequirement = ({ name, register, errors, setValue }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const { course, editCourse } = useSelector((state) => state.course)

    useEffect(() => {
        if (editCourse) {
            setRequirementList(JSON.parse(course?.instructions[0]))
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])

    const addRequirementHandler = (e) => {
        e.preventDefault()
        if (requirement && !requirementList.includes(requirement)) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
            console.log(requirementList)
        }
    }

    const removeRequirementHandler = (index) => {
        const update = [...requirementList];
        update.splice(index, 1);
        setRequirementList(update);
    }

    return (
        <div className='w-full flex flex-col gap-1 items-start'>
            <label className='w-full flex flex-col items-start gap-2'>
                <p className='text-richblack-5 text-sm font-normal'>
                    Requirement/Instruction
                    <span className='text-pink-200 text-sm font-normal'>*</span>
                </p>
                <input
                    type='text'
                    placeholder='Enter requirement'
                    className="w-full flex p-3 items-center gap-3 rounded-lg
                         bg-richblack-700 border-b-[2px] border-richblack-500"
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                />

            </label>

            <button 
                onClick={addRequirementHandler}
                className='text-yellow-50 font-medium text-base'>
                Add
            </button>

            {
                requirementList.length > 0 && (
                    <ul className='flex flex-col gap-1'>
                        {
                            requirementList.map((requirement, index) => (
                                <div key={index}
                                    className='flex w-fit gap-3 bg-richblack-700 rounded-md px-2'>

                                    <p className='text-richblack-5'>
                                        {requirement}
                                    </p>

                                    <button type='button'
                                        onClick={() => removeRequirementHandler(index)}
                                        className='text-richblack-500 font-medium'>
                                        clear
                                    </button>
                                </div>
                            ))}
                    </ul>
                )
            }
            {
                errors[name] && (
                    <span className='text-pink-200 text-xs'>
                        **instruction is required
                    </span>
                )
            }
        </div>
    )
}