import blog from './blogs'
import cloneDeep from 'lodash.clonedeep'

const likeBlog = async (currentBlog, likeIncrease = 1) => {
  let returnBlog = cloneDeep(currentBlog)

  const userId = currentBlog.user.id
  const blogId = currentBlog.id

  delete returnBlog.user
  delete returnBlog.id

  returnBlog.user = userId
  returnBlog.likes += likeIncrease

  return await blog.put(returnBlog, blogId)
}

export default likeBlog
