import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = (blog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const request = axios.post(baseUrl, blog, config);
  return request.then(response => response.data);
}

const put = (updatdedBlog, id) => {
  const request = axios.put(`${baseUrl}/${id}`, updatdedBlog)
  return request
    .then(response => response.data)
    .catch(error => error)
}

const del = (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request
    .then(response => response.data)
    .catch(error => error)
}

export default { getAll, post, put, del }
