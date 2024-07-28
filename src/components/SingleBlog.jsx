
import React from 'react';

const SummeryBlog = ({ blog }) => (
  <div>
    <b>Title: {blog.title}</b><br /> Author: {blog.author}
  </div>
)

const ExtendedBlog = ({ blog, handleLike, handleDelete }) => (
  <div>
    Url: {blog.url} <br />
    Likes: {blog.likes} <button onClick={() => handleLike(blog)} >Like</button> <br />
    User: {blog.user?.name || 'Unknown'} <br />
    <button onClick={() => handleDelete(blog)}>Delete</button>
  </div>
)

export {
  SummeryBlog,
  ExtendedBlog
}
