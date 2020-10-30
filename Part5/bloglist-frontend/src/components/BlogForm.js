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
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={blogURL}
            name="URL"
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.displayName = 'BlogForm'
BlogForm.propTypes = { addBlog: PropTypes.func.isRequired }

export default BlogForm