import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {users.map(user => <p key={user.id}>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
        {user.blogs.length}</p>)}
    </div>
  )
}

export default Users