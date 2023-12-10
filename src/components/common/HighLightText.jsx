import React from 'react'

export const HighLightText = ({children}) => {
  return (
    <span className='custom-highlighter'>
        {` ${children} `}
    </span>
  )
}
