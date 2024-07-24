
import React from 'react';

const SingleBlog = ({ blog }) => (
  <div>
    <b>Title: {blog.title}</b><br/> Author: {blog.author}
  </div>
)

export default SingleBlog
