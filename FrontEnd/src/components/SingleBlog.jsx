
import React from 'react'
import PropTypes from 'prop-types'

const SummeryBlog = ({ blog }) => (
  <div className='SummeryBlog'>
    <b>Title: {blog.title}</b><br /> Author: {blog.author}
  </div>
)

const ExtendedBlog = ({ blog, handleLike, handleDelete }) => (
  <div className='ExtendedBlog'>
    Url: {blog.url} <br />
    Likes: {blog.likes} <button onClick={() => handleLike(blog)} >Like</button> <br />
    User: {blog.user?.name || 'Unknown'} <br />
    <button onClick={() => handleDelete(blog)}>Delete</button>
  </div>
)

const BlogPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired
})

SummeryBlog.propTypes = {
  blog: BlogPropType.isRequired
}

ExtendedBlog.propTypes = {
  blog: BlogPropType.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export {
  SummeryBlog,
  ExtendedBlog
}
