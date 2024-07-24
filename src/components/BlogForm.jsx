import React, { useState } from 'react';
import blog from '../services/blogs'
import logger from '../logger';

const BlogForm = ({ user, fetchBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleAddBlog = async (event) => {
    event.preventDefault();
    try {
      const response = await blog.post({
        title,
        author,
        url,
      }, user.token);
      // onBlogAdded(response.data); // Pass the new blog to the parent component
      setTitle('');
      setAuthor('');
      setUrl('');
      fetchBlogs();
      logger.info(response)
    } catch (error) {
      console.error('There was an error adding the blog!', error);
    }
  };

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
  );
};

export default BlogForm;
