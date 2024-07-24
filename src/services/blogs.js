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

export default { getAll, post }
