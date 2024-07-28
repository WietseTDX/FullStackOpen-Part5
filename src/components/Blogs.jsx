import React, { useRef } from 'react'
import { SummeryBlog, ExtendedBlog } from './SingleBlog'
import { VisibilityState, Togglable } from './ToggleComponent'

const Blogs = ({ blogs, handleLike, handleDelete }) => {
  const ExtentedRef = useRef()

  return (
    <div>
      {
        blogs.map(blog =>
          <div key={blog.id}>
            <SummeryBlog blog={blog} />
            <Togglable buttonLabel={"Show"} HideButton={"Hide"} ref={ExtentedRef}>
              <ExtendedBlog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
            </Togglable>
          </div>
        )
      }
    </div>
  )
}

export default Blogs
