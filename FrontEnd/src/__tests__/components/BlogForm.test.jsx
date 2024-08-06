import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../../components/BlogForm'
import { beforeEach, describe, expect, test, vi } from 'vitest'

describe('<BlogForm />', () => {
  const mockBlogAdded = vi.fn()
  let emptyForm = false
  let container

  beforeEach(() => {
    container = render(<BlogForm handleAddBlog={mockBlogAdded} emptyForm={emptyForm}  />).container
  })

  test('Check if BlogForm is rendered properly ', () => {
    const form = container.querySelector('.BlogForm')
    expect(form).toBeDefined()
  })

  const requiredKeysBlogObject = ['title', 'author', 'url']

  const checkKeysValidBlogObject = (obj, keys) => {
    return keys.every(key => Object.prototype.hasOwnProperty.call(obj, key))
  }

  test('Fill out form and submit', async () => {
    const user = userEvent.setup()

    const formTestData = {
      title: 'Title of blog',
      author: 'author of blog',
      url: 'http://localhost:1234'
    }

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const URLInput = screen.getByPlaceholderText('URL')
    const addBlogButton = screen.getByText('Add Blog')

    await user.type(titleInput, formTestData.title)
    await user.type(authorInput, formTestData.author)
    await user.type(URLInput, formTestData.url)
    await user.click(addBlogButton)

    expect(mockBlogAdded.mock.calls).toHaveLength(1)
    expect(checkKeysValidBlogObject(mockBlogAdded.mock.calls[0][0], requiredKeysBlogObject))
    expect(mockBlogAdded.mock.calls[0][0]).toStrictEqual(formTestData)
  })

  test('filled out data')

})
