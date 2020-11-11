import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let component

  const blog = {
    title: 'title',
    author: 'author',
    url: 'http',
    likes: 1,
    user: {
      username: 'rescawen',
      name: 'wenlei',
      id: '2'
    }
  }

  const likeBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeBlog={likeBlog}/>
    )
    // component.debug()
  })

  test('renders title and author, but not rest of the information like url and likes', () => {

    const blogHeader = component.container.querySelector('.blogHeader')
    const blogBody = component.container.querySelector('.blogBody')

    expect(blogHeader).toBeVisible()
    expect(blogHeader).toHaveTextContent('title')
    expect(blogHeader).toHaveTextContent('author')
    expect(blogBody).not.toBeVisible()
  })

  test('after view button clicked, blog url and number of likes are shown', () => {

    const viewButton = component.getByText('view')
    const blogBody = component.container.querySelector('.blogBody')

    expect(blogBody).not.toBeVisible()
    fireEvent.click(viewButton)

    expect(blogBody).toBeVisible()
    expect(blogBody).toHaveTextContent('http')
    expect(blogBody).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('after like button is clicked, event handler received as props is called twice', () => {

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)

  })

})

