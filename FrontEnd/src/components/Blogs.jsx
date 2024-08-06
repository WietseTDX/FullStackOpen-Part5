import React, { useRef } from 'react'
import { SummeryBlog, ExtendedBlog } from './SingleBlog'
import { Togglable } from './ToggleComponent'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, handleLike, handleDelete }) => {
  const ExtentedRef = useRef()

  return (
    <div>
      {
        blogs.map(blog =>
          <div key={blog.id}>
            <SummeryBlog blog={blog} />
            <Togglable buttonLabel={'Show'} hideButton={'Hide'} ref={ExtentedRef}>
              <ExtendedBlog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
            </Togglable>
          </div>
        )
      }
    </div>
  )
}

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

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(BlogPropType).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blogs
