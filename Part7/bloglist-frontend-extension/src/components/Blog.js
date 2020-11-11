import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const onLikeBlog = (event) => {
    event.preventDefault()
    likeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const onDeleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog({
        id: blog.id,
        title: blog.title
      })
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle} data-cy='blog'>
      <div className='blogHeader' style={hideWhenVisible}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        <button onClick={toggleVisibility} data-cy='blog-toggle-open'>view</button>
      </div>
      <div className='blogBody' style={showWhenVisible}>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes <span data-cy='blog-likes'>{blog.likes}</span> <button onClick={onLikeBlog} data-cy='like-blog'>like</button>
        <br />
        {blog.user.name}
        <br />
        <button onClick={onDeleteBlog} data-cy='delete-blog'>remove</button>
      </div>
    </div>
  )
}

export default Blog
