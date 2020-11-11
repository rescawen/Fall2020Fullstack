import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

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
      <Jumbotron>
        <h1>{blog.title} {blog.author}</h1>
        <p>
          {blog.url}
        </p>
        <br />
        likes <span data-cy='blog-likes'>{blog.likes}</span> <Button variant="success" onClick={onLikeBlog} data-cy='like-blog'>like</Button>
        <br />
        {blog.user.name}
        <br />
        <Button variant="danger" onClick={onDeleteBlog} data-cy='delete-blog'>remove</Button>
      </Jumbotron>



    </div>
  )
}

export default BlogView