import React from 'react'
import "./CodeBlocks.css"
import { CTAButton } from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const num = [1,2,3,4,5,6,7,8,9,10,11,12]

export const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock
}) => {
    return (
        <div className={`flex ${position} w-full lg:w-10/12 mx-auto
                mt-6 items-center lg:gap-x-16 gap-y-16 justify-between`}>
            {/* Section 1 */}
            <div className="lg:w-1/2 w-full flex flex-col items-start text-start gap-8">
                <div className=''>
                    {heading}
                </div>

                <div className='text-richblack-300 font-semibold'>
                    {subheading}
                </div>

                <div className='w-full flex gap-6'>
                    <div className='w-fit'>
                        <CTAButton
                            active={ctabtn1.active}
                            linkto={ctabtn1.linkto}>
                            <div className='flex gap-2 items-center justify-center'>
                                <div>
                                    {ctabtn1.btnText}
                                </div>
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>

                    <div className='w-fit'>
                        <CTAButton
                            active={ctabtn2.active}
                            linkto={ctabtn2.linkto}>
                            <p>
                                {ctabtn2.btnText}
                            </p>
                        </CTAButton>
                    </div>
                </div>
            </div>

            {/* Section 2 */}
            <div className='flex w-full relative bg-gradient-to-r 
                from-richblack-800 text-sm bg-opacity-25  border-l-[1px]
                h-fit rounded-md border-t-[1px] border-richblack-400
                border-opacity-25 blur-custom lg:w-[500px]'>

                <div className='text-center flex items-center font-inter font-bold
                        flex-col text-sm w-[10%] text-richblack-400 gap-x-2'>
                            {
                                num.map((ele, index) => (
                                    <p>{ele}</p>
                                ))
                            }
                    
                    {/* <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p> */}
                </div>

                <div className={`font-bold w-[90%] flex flex-col lg:gap-2 
                            font-mono px-2 text-[#C5C7D4]`}>
                    <TypeAnimation
                        sequence={[codeblock, 0, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block",
                                fontSize:"1rem"
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>

                <div className={`absolute w-[372.949px] h-[257.054px] -top-5 -left-5 z-3
                        ${ctabtn1.btnText !== "Try it Yourself" ? "custom-bg-blue" : "custom-bg-org"}`}>
                </div>
            </div>
        </div>
    )
}
