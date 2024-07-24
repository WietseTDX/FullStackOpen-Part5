import React, { useState, useEffect } from 'react'
import Blog from './components/Blogs'
import BlogFrom from './components/BlogForm'
import blogService from './services/blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const handleNotificationClose = () => {
    setNotification(null)
  }

  const logoutCallback = () => {
    setUser(null)
  }

  const fetchBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div>
      <h2>Login</h2>
      { user === null && <Login setUser={setUser} setNotification={setNotification}/> }
      { user !== null && <Logout user={user} logoutCallback={logoutCallback} setNotification={setNotification} /> }
      { user !== null && <Blog blogs={blogs} /> }
      { user !== null && <BlogFrom user={user} fetchBlogs={fetchBlogs} setNotification={setNotification} /> }

      { notification !== null && <Notification notificationData={notification} onClose={handleNotificationClose} />}
    </div>
  )
}

export default App
