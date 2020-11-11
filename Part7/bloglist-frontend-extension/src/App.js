import React, { useState, useEffect } from 'react'
import {
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import './App.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useResource } from './hooks/resources'
import loginService from './services/login'
import { Form, Button } from 'react-bootstrap'

const App = () => {
  const [blogs, blogService] = useResource('/api/blogs')
  const [users, userService] = useResource('/api/users')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll()
  }, [])

  useEffect(() => {
    userService.getAll()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // blogService.setToken(user.token)
    }
  }, [])

  const userMatch = useRouteMatch('/users/:id')
  const specificUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const specificBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      // blogService.setToken(user.token)
      setUser(user)
      setNotificationMessage({ text: `${user.name} has successfully logged in`, success: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({ text: 'Wrong username or password', success: false })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setNotificationMessage({ text: `${user.name} has successfully logged out`, success: true })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.create(blogObject)
      setNotificationMessage({ text: `${blogObject.title} by ${blogObject.author} added`, success: true })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject)
      // const returnedBlog = await blogService.update(blogObject.id, blogObject)
      // const index = blogs.findIndex(b => b.id === blogObject.id)
      // blogs[index] = returnedBlog
      // setBlogs(blogs)
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
      blogService.setToken(user.token)
      await blogService.remove(blogObject.id)
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
    <Togglable buttonLabel='new blog' dataCy='new-blog'>
      <BlogForm addBlog={addBlog} />
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
              data-cy="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              data-cy="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button variant="primary" type="submit">login</Button>
        </form>
      </div>
    )
  }

  const padding = {
    padding: 5
  }



  return (
    <div>
      <h2>blog app</h2>
      <Notification message={notificationMessage} />
      <div>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Switch>
        <Route path="/users/:id">
          <User user={specificUser} />
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
        <Route path="/blogs/:id">
          <BlogView blog={specificBlog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        </Route>
        <Route path='/'>
          {blogForm()}
          <br />
          <h2>blog list</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App