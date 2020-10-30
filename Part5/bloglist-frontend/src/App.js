import React, { useState, useEffect } from 'react'
import './App.css';
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(
        (b1, b2) => (b1.likes < b2.likes) ? 1 : (b1.likes > b2.likes) ? -1 : 0)
      )
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

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage({ text: `${blogObject.title} by ${blogObject.author} added`, success: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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

  const likeBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      const index = blogs.findIndex(b => b.id === blogObject.id)
      blogs[index] = returnedBlog
      setBlogs(blogs)
      setNotificationMessage({ text: `you have liked ${blogObject.title}`, success: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))
      setNotificationMessage({ text: `successfully deleted ${blogObject.title}`, success: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

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
      {blogForm()}
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App