import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blogs'
import BlogFrom from './components/BlogForm'
import blogService from './services/blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import { Togglable, VisibilityState } from './components/ToggleComponent'
import likeBlog from './services/likeBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const loginRef = useRef()

  const handleNotificationClose = () => {
    setNotification(null)
  }

  const logoutCallback = () => {
    setUser(null)
  }

  const fetchBlogs = () => {
    blogService.getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => b?.likes - a?.likes))
      )
      .catch(error => {
        setNotification({
          message: `Server not up, code ${error}`,
          type: 'error'
        })
      })
  }

  const handleLike = async (blog) => {
    const response = await likeBlog(blog)
    const error = response.response?.status || null
    if (error !== null) {
      setNotification({
        message: `Error liking blog, code ${error}`,
        type: 'error'
      })
    } else {
      fetchBlogs()
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      const response = await blogService.del(blog.id, user.token)
      const error = response.response?.status || null
      if (error !== null) {
        setNotification({
          message: `Error deleting blog, code ${error}`,
          type: 'error'
        })
      } else {
        fetchBlogs()
      }
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const loggedInContent = (
    <div>
      <Logout user={user} logoutCallback={logoutCallback} setNotification={setNotification} />
      <h2>blogs</h2>
      <Togglable buttonLabel={"New Blog"} ref={loginRef}>
        <BlogFrom user={user} fetchBlogs={fetchBlogs} setNotification={setNotification} />
      </Togglable>
      <Blog blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} />
    </div>
  )

  const loggedOutContent = (
    <div>
      <Togglable buttonLabel={"Login"} defaultState={VisibilityState.SHOW} ref={loginRef}>
        <Login setUser={setUser} setNotification={setNotification} />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h2>Login</h2>
      {user === null ?
        loggedOutContent
        :
        loggedInContent
      }

      {notification !== null && <Notification notificationData={notification} onClose={handleNotificationClose} />}
    </div>
  )
}

export default App
