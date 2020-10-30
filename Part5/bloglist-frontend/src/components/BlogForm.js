import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogURL, setBlogURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
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
            <form onSubmit={addBlog}>
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

export default BlogForm