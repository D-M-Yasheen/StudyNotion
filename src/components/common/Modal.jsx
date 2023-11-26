import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'


export const Modal = ({ modalData, type }) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "hidden";
        }
    },[])
    return ReactDOM.createPortal(
        <>
            <div className={`fixed inset-0 !mt-0 grid h-screen 
                            w-screen place-items-center bg-opacity-10 
                            backdrop-blur-sm overflow-y-hidden bg-white `}
                onClick={modalData.btn2Handler}>
            </div>

            <div className={`fixed flex w-[20rem] h-[15rem] flex-col rounded-lg
                            items-center justify-around gap-3 px-10 py-8 shadow-2xl text-center
                            top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  
                            shadow-richblack-900  bg-richblack-800 border-[1px] 
                            border-richblack-400`}>

                <h1 className={`text-start text-xl font-semibold text-richblack-5`}>

                    {modalData?.text1}

                </h1>

                <p className={`text-start text-sm font-normal whitespace-wrap text-richblack-100 
                text-ellipsis overflow-hidden `}>

                    {modalData?.text2}

                </p>

                <div className='flex justify-between w-full'>

                    <button onClick={modalData?.btn1Handler}
                        className={`py-2 px-5 rounded-md select-none border-r-yellow-5
                        text-md font-semibold hover:scale-95 text-center
                        transition-all duration-200 border-b-2 border-r-2
                        text-richblack-900 bg-yellow-50 border-b-yellow-5  `}>
                        {modalData?.btn1Text}
                    </button>

                    <button onClick={modalData?.btn2Handler}
                        className={`py-2 px-5 rounded-md select-none 
                        border-r-richblack-500 bg-richblack-700 
                        border-b-richblack-500  hover:scale-95 
                        text-center text-richblack-5 border-b-2 border-r-2
                        text-md font-semibold  transition-all duration-200`}>
                        {modalData?.btn2Text}
                    </button>

                </div>

            </div>

        </>,
        document.querySelector(".modal")
    )
}
