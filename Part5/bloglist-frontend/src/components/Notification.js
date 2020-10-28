
import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.success) {
    return (
      <div className="notification success">
        {message.text}
      </div>
    )
  } else if (!message.success) {
    return (
      <div className="notification failure">
        {message.text}
      </div>
    )
  }

  // return (
  //   <div className="error">
  //     {message}
  //   </div>
  // )
}

export default Notification