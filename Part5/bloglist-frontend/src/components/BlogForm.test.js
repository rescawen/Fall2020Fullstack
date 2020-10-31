import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('form calls the event handler it received as props with the right details when a new blog is created', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const title = component.container.querySelector('.Title')
  const author = component.container.querySelector('.Author')
  const url = component.container.querySelector('.URL')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'title' } })
  fireEvent.change(author, { target: { value: 'author' } })
  fireEvent.change(url, { target: { value: 'url' } })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('title')
  expect(addBlog.mock.calls[0][0].author).toBe('author')
  expect(addBlog.mock.calls[0][0].url).toBe('url')
})