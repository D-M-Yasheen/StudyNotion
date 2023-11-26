export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`w-full flex lg:py-3 md:py-2 py-1 lg:px-6 md:px-4 px-2 justify-center 
      items-center gap-2 text-center font-medium text-base transition-all 
      duration-200 rounded-lg  font-inter border-b-[2px] ${customClasses} 
      ${outline ? " text-richblack-900 bg-yellow-100 border-yellow-5" :
          " text-richblack-5 bg-richblack-900 border-richblack-300 "} `}
      type={type}
    >
      {children ? (
        <>
          <span>
            {text}
          </span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}