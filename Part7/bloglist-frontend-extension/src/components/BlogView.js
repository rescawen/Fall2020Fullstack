import React from 'react'

const BlogView = ({ blog, likeBlog, deleteBlog }) => {
  if (!blog) {
    return null
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

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <br />
      {blog.url}
      <br />
        likes <span data-cy='blog-likes'>{blog.likes}</span> <button onClick={onLikeBlog} data-cy='like-blog'>like</button>
      <br />
      {blog.user.name}
      <br />
      <button onClick={onDeleteBlog} data-cy='delete-blog'>remove</button>

    </div>
  )
}

export default BlogView