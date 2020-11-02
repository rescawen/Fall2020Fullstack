import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  const onAddBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogURL('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onAddBlog}>
        <div>
            title:
          <input
            type="text"
            value={blogTitle}
            className="Title"
            data-cy="blog-title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={blogAuthor}
            className="Author"
            data-cy="blog-author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={blogURL}
            className="URL"
            data-cy="blog-url"
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>
        <button type="submit" data-cy="create-blog-button">create</button>
      </form>
    </div>
  )
}

BlogForm.displayName = 'BlogForm'
BlogForm.propTypes = { addBlog: PropTypes.func.isRequired }

export default BlogForm