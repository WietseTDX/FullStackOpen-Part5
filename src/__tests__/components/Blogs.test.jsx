import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogs from '../../components/Blogs'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('<Blogs />', () => {
  const mockLikeHandler = vi.fn()
  const mockDeleteHandler = vi.fn()
  let container

  beforeEach(() => {
    const blog = [{
      title: 'I am stupid',
      author: 'Me',
      url: 'https://localhost:300',
      likes: 18,
      user: {
        username: 'pass',
        name: 'Tok',
        id: '669f9194754a68b4f6156ac8'
      },
      id: '66a10b8b1846d7e7a0c0af6a'
    }]

    container = render(<Blogs blogs={blog} handleLike={mockLikeHandler} handleDelete={mockDeleteHandler} />).container
  })

  test('Renders summery content by default', () => {
    const divSummery = container.querySelector('.SummeryBlog')
    expect(divSummery).toHaveTextContent(
      'Title: I am stupid Author: Me'
    )

    const togglableExtended = container.querySelector('.TogglableContent')
    const togglableContent = togglableExtended.querySelector('.ExtendedBlog')
    expect(togglableContent).toBeDefined()
    expect(togglableExtended).toHaveStyle('display: none')
  })

  test('Renders summery and after button press extended contect', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const divSummery = container.querySelector('.SummeryBlog')
    expect(divSummery).toHaveTextContent(
      'Title: I am stupid Author: Me'
    )
    const divExtended = container.querySelector('.ExtendedBlog')
    expect(divExtended).toHaveTextContent(
      'Url: https://localhost:300 Likes: 18 Like User: Tok Delete'
    )
  })

  test('Show and hide extended content', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('Show')
    await user.click(showButton)

    const divExtendedShow = container.querySelector('.TogglableContent')
    expect(divExtendedShow).not.toHaveStyle('display: none')

    const divExtended = container.querySelector('.ExtendedBlog')
    expect(divExtended).toBeDefined()

    const hideButton = screen.getByText('Hide')
    await user.click(hideButton)
    const divExtendedHide = container.querySelector('.TogglableContent')
    expect(divExtendedHide).toHaveStyle('display: none')
  })

  const requiredKeysBlogObject = ['title', 'author', 'url', 'likes', 'user', 'id']

  const checkKeysValidBlogObject = (obj, keys) => {
    return keys.every(key => Object.prototype.hasOwnProperty.call(obj, key))
  }

  test('Like blog', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('Show')
    await user.click(showButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
    expect(checkKeysValidBlogObject(mockLikeHandler.mock.calls[0][0], requiredKeysBlogObject))
  })

  test('Delete blog', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('Show')
    await user.click(showButton)

    const DeleteButton = screen.getByText('Delete')
    await user.click(DeleteButton)

    expect(checkKeysValidBlogObject(mockDeleteHandler.mock.calls[0][0], requiredKeysBlogObject))
  })
})
