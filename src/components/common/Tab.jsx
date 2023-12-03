import React from 'react'

export const Tab = ({ tabData, accountType, setAccountType }) => {
    return (
        <div>
            {/* Student and Instructor toggle buttons */}
            <div className='p-1 w-fit rounded-full flex transition-all duration-200
            gap-[5px] bg-richblack-800 border-b-[1px] border-richblack-600'>
                {
                    tabData.map((tab) => {
                        return (
                            <button key={tab.id} className={`text-center py-[6px] px-[18px] rounded-full
                                            ${accountType === tab.type ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"}`}
                                onClick={() => setAccountType(tab.type)}>
                                {tab.tabName}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}
