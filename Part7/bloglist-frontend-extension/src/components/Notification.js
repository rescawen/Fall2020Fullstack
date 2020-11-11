
import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } else if (message.success) {
    return (
      <div className="notification success" data-cy="notification-success">
        {message.text}
      </div>
    )
  } else if (!message.success) {
    return (
      <div className="notification failure" data-cy="notification-failure">
        {message.text}
      </div>
    )
  }
}

export default Notification