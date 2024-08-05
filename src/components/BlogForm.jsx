import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleAddBlog, emptyForm = false }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogData = {
      title,
      author,
      url
    }
    handleAddBlog(blogData)
  }

  useEffect(() => {
    if (emptyForm) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }, [emptyForm])


  return (
    <div className='BlogForm'>
      <h2>Add a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(value) => setTitle(value.target.value)}
            placeholder='Title'
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(value) => setAuthor(value.target.value)}
            placeholder='Author'
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            value={url}
            onChange={(value) => setUrl(value.target.value)}
            placeholder='URL'
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  emptyForm: PropTypes.bool
}

export default BlogForm
