
import React from 'react'
import PropTypes from 'prop-types'

const SummeryBlog = ({ blog }) => (
  <div className='SummeryBlog'>
    <b>Title: {blog.title}</b><br /> Author: {blog.author}
  </div>
)

const ExtendedBlog = ({ blog, user, handleLike, handleDelete }) => (
  <div className='ExtendedBlog'>
    Url: {blog.url} <br />
    Likes: {blog.likes} <button onClick={() => handleLike(blog)} >Like</button> <br />
    User: {blog.user?.name || 'Unknown'} <br />
    {user?.id === blog.user?.id && <button onClick={() => handleDelete(blog)}>Delete</button>}
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

const userPropType = PropTypes.shape({
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
})

ExtendedBlog.propTypes = {
  blog: BlogPropType.isRequired,
  user: PropTypes.oneOfType([
    userPropType,
    PropTypes.oneOf([null])
  ]),
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export {
  SummeryBlog,
  ExtendedBlog
}
