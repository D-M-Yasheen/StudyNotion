import "./ShowCards.css"
import React from 'react'
import { CTAButton } from './CTAButton';
import { ImTree } from "react-icons/im"
import { HiUsers } from "react-icons/hi"

export const ShowCards = ({ showCards, highlightedCards, setHighlightedCards }) => {

    function changeHighlightedCardHandler(value) {
        setHighlightedCards(value);
    }

    return (
        <section className='flex flex-col items-start lg:items-center'>

            {/* All Cards */}
            <div className='flex flex-wrap mx-auto px-4 lg:px-10 py-9 gap-9 items-start'>
                {
                    showCards.map((element, index) => {
                        return (
                            <div key={index}
                                className={`w-[350px] mx-auto transition-all duration-200
                                ${highlightedCards === element.heading ?
                                        "bg-white custom-yellow-shadow" :
                                        "bg-richblack-900 text-richblack-25"} `}
                                onClick={() => changeHighlightedCardHandler(element.heading)}
                            >
                                <div className={`px-6 pt-8 pb-[52px] border-b-2
                                    border-dashed border-richblack-700`}>
                                    <h1 className={`text-xl font-inter font-semibold 
                                        ${highlightedCards === element.heading ?
                                            "text-richblack-800" :
                                            "text-richblack-25"}`}>

                                        {element.heading}
                                    </h1>

                                    <p className={`mt-3 text-base font-normal
                                        ${highlightedCards === element.heading ?
                                            "text-richblack-500" :
                                            "text-richblack-400"}
                                            self-stretch font-inter`}>
                                        {
                                            `${element.description.substring(0, 100)}...`
                                        }
                                    </p>
                                </div>

                                <div className={`px-6 py-4 flex justify-between text-base 
                                        font-medium text-center1 ${highlightedCards === element.heading ?
                                        "text-[#0A5A72]" : "text-richblack-300"}`}>
                                    <div className='flex justify-center items-center gap-2'>
                                        <HiUsers />
                                        {element.level}
                                    </div>

                                    <div className='flex justify-center items-baseline gap-2'>
                                        <ImTree />
                                        {element.lessionNumber}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Buttons */}
            <div className='flex lg:items-center space-x-6 mx-auto mt-8 gap-4 justify-center'>
                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <p>Explore Full Catalog</p>
                    </CTAButton>
                </div>

                <div className='w-fit'>
                    <CTAButton active={false} linkto={"/login"}>
                        <p>Learn More</p>
                    </CTAButton>
                </div>
            </div>
        </section>
    )
}
