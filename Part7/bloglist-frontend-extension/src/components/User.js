import React from 'react'

const User = ({ user }) => {

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.username}</h2>

    </div>
  )
}

export default User