import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import { CTAButton } from './CTAButton'
import Banner from "../../../assets/Images/banner.mp4"
import { CodeBlocks } from '../HomePage/CodeBlocks'
import { HomePageExplore } from '../../../data/homepage-explore'
import { ShowCards } from './ShowCards'

const tabNames = ["Free", 'New to coding', "Most popular", "Skills paths", "Career paths"]

export const HomeSection1 = () => {
    const [currentTab, setCurrentTab] = useState(tabNames[0]);
    const [showCards, setShowCards] = useState(HomePageExplore[0].courses);
    const [highlightedCards, setHighlightedCards] = useState(HomePageExplore[0].courses[0].heading);

    const changeCardsHandler = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((element) => element.tag === value);
        // console.log(result[0].courses)
        setShowCards(result[0].courses);
        setHighlightedCards(result[0].courses[0].heading)
        // console.log("showCards : ", showCards);
        // console.log("highlighted card : ", highlightedCards)
    }


    return (
        <section className='relative mx-auto flex flex-col justify-between 
            lg:items-center items-start text-white w-11/12 max-w-maxContent'>

            {/* Intro Section  */}
            <div className='w-full mx-auto flex flex-col 
            lg:items-center justify-center items-start'>

                <NavLink to="/signup">

                    <button className='w-fit flex justify-center lg:items-center 
                    items-start group p-1 mx-auto text-richblack-200 border-b-2
                    transition-all  border-richblack-500 duration-200
                    rounded-full bg-richblack-800 font-bold hover:scale-95'>

                        <div className='flex flex-row group-hover:bg-richblack-900
                        lg:items-center items-start justify-center px-10 py-[5px]
                        gap-2 rounded-full transition-all duration-200'>

                            <p>
                                Become an Instructor
                            </p>

                            <FaArrowRight />

                        </div>

                    </button>

                </NavLink>

                <h1 className='lg:text-center text-left
                text-4xl font-semibold mt-7
                '>
                    Empower Your Future with
                    <span className='custom-highligter'>
                        {" Coding Skills "}
                    </span>
                </h1>

                <div>
                    <p className='mt-4 mx-auto lg:w-10/12
                    lg:text-center text-left text-lg font-semibold 
                    text-richblack-300
                    '>
                        With our online coding courses,
                        you can learn at your own pace,
                        from anywhere in the world,
                        and get access to a wealth of resources,
                        including hands-on projects,
                        quizzes, and personalized feedback from instructors.
                    </p>
                </div>

                <div className='flex flex-row gap-7 mt-8
                '>
                    <CTAButton
                        active={true}
                        linkto={"/signup"}
                    >
                        Learn More
                    </CTAButton>

                    <CTAButton
                        active={false}
                        linkto={"/login"}
                    >
                        Book a Demo
                    </CTAButton>
                </div>
            </div>

            {/* Video */}
            <video className='mx-auto my-12 w-full lg:w-10/12 aspect-video shadow-custom'
                muted loop autoPlay>

                <source src={Banner} type='video/mp4' />

            </video>

            {/* Code Block Section 1 */}
            <div className='w-full mx-auto my-12 py-16'>

                <CodeBlocks
                    position={"lg:flex-row flex-col"}
                    heading={
                        <h1 className='text-4xl
                            font-semibold'>
                            Unlock your
                            <span className='custom-highligter'>
                                {" coding potential "}
                            </span>
                            with our online courses.
                        </h1>
                    }
                    subheading={
                        `Our courses are designed and 
                            taught by industry experts who 
                            have years of experience in 
                            coding and are passionate about 
                            sharing their knowledge with you.`
                    }
                    ctabtn1={
                        {
                            active: true,
                            linkto: "/signup",
                            btnText: "Try it Yourself"
                        }
                    }
                    ctabtn2={
                        {
                            active: false,
                            linkto: "/login",
                            btnText: "Learn more"
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>
                            <html>
                            <head>
                                <title> Example </title>
                                <link rel="stylesheet" 
                                href="styles.css">
                            </head>
                            <body>
                                <h1> Heading </h1>
                                <div> Container </div>
                            </body>
                            </html>`
                    } />
            </div>

            {/* Code Block Section 2 */}
            <div className='w-full mx-auto my-12 py-16'>
                <CodeBlocks
                    position={"lg:flex-row-reverse flex-col"}
                    heading={
                        <h1 className='text-4xl
                            font-semibold'>
                            Start
                            <span className='custom-highligter'>
                                {" coding in seconds "}
                            </span>
                        </h1>
                    }
                    subheading={
                        `Go ahead, give it a try. 
                                Our hands-on learning 
                                environment means you'll 
                                be writing real code from 
                                your very first lesson.`
                    }
                    ctabtn1={
                        {
                            active: true,
                            linkto: "/signup",
                            btnText: "Continue Lesson"
                        }
                    }
                    ctabtn2={
                        {
                            active: false,
                            linkto: "/login",
                            btnText: "Learn more"
                        }
                    }
                    codeblock={
                        `import React from 'react'
                        import App from "./App";

                        const root = 
                        ReactDOM.createRoot(
                            document.getElementById("root"));

                        root.render(
                          <React.StrictMode>
                            <App />
                          </React.StrictMode>
                        );`
                    } />
            </div>

            {/* Tab and courses  */}
            <div className='w-full flex flex-col justify-center items-center'>

                <div className='flex flex-col justify-center 
                lg:items-center items-start'>

                    <p className='text-4xl font-semibold mb-2 px-4'>
                        Unlock the
                        <span className='custom-highligter'>{" Power of Code "}  </span>
                    </p>

                    <p className='text-[14px] mb-2 px-4 font-inter 
                    text-richblack-400'>
                        Learn to build anything you can imagine
                    </p>

                </div>

                {/* Tabs */}
                <div className='flex flex-col items-center mx-auto'>

                    <ul className='flex items-center gap-2 w-fit rounded-full my-8 py-2 px-4 bg-richblack-800'>

                        {
                            tabNames.map((element, index) => {

                                return (
                                    <li key={index}
                                        className={` cursor-pointer rounded-full py-2 px-4
                                            transition-all duration-200 lg:text-sm text-xs
                                            ${currentTab === element ?
                                                `bg-richblack-900 text-white scale-110 
                                            transition-all duration-200` :
                                                "text-richblack-25"} select-none `}
                                        onClick={() => changeCardsHandler(element)}>

                                        {element}

                                    </li>
                                )
                            })
                        }
                    </ul>

                    {/* Cards */}
                    <ShowCards
                        showCards={showCards}
                        highlightedCards={highlightedCards}
                        setHighlightedCards={setHighlightedCards} />

                </div>

            </div>

            <div className=' h-24'></div>

        </section>
    )
}
