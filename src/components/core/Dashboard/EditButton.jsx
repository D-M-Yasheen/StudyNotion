export const EditButton = (props) => {

    return (
        <button type={props.type}
            className={`flex justify-center items-center rounded-lg px-3 py-1  
                gap-2 hover:scale-95 transition-all duration-200
                ${props.active ? `bg-yellow-50 border-yellow-25 border-[1px]
                 text-richblack-900` : `bg-richblack-700 border-richblack-600
                  border-[1px] text-richblack-5`} `}>

            {props.children}

        </button>
    )
}

