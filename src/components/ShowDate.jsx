import React from 'react'

const ShowDate = ({timestamp}) => {
    const date = new Date(timestamp);

    const currentDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    const currentTime = date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true })
  return (
    <div>
         <p className="text-xs">{currentDate}</p>
         <p className="text-xs">{currentTime}</p>
    </div>
  )
}

export default ShowDate