import React, { useState } from 'react'
import blog from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ user, fetchBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      await blog.post({
        title,
        author,
        url,
      }, user.token)
      setNotification({
        message: `A new Blog by ${author}, ${title}`,
        type: 'default'
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      fetchBlogs()
    } catch (error) {
      console.error('There was an error adding the blog!', error)
      setNotification({
        message: 'An error occured adding the blog',
        type: 'error'
      })
    }
  }

  return (
    <div>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(value) => setTitle(value.target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(value) => setAuthor(value.target.value)}
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            value={url}
            onChange={(value) => setUrl(value.target.value)}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

const userPropType = PropTypes.shape({
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
})

BlogForm.propTypes = {
  user: PropTypes.oneOfType([
    userPropType,
    PropTypes.oneOf([null])
  ]),
  fetchBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default BlogForm
