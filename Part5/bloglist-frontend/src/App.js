import React, { useState, useEffect } from 'react'
import './App.css';
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotificationMessage({ text: `${user.name} has successfully logged in`, success: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({ text: `Wrong username or password`, success: false })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    setNotificationMessage({ text: `${user.name} has successfully logged out`, success: true })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    setUser(null)
    window.localStorage.clear()
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    }
    try {
      await blogService.create(blog)
      setNotificationMessage({ text: `${blog.title} by ${blog.author} added`, success: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogURL('')
    } catch (exception) {
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      // in case there is limitation for how blogs are added, use below for error
      // (error) { 
      //   setNotificationMessage({ text: error.response.data.error, success: true })
      //   setTimeout(() => {
      //     setNotificationMessage(null)
      //   }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} />
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
      <br />

      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App