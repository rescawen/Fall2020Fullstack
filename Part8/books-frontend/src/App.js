
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries'


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const authorQuery = useQuery(ALL_AUTHORS)
  const bookQuery = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  if (authorQuery.loading || bookQuery.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  const Buttons = () => {
    if (!token) {
      return (
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
      )
    }

    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>
    )
  }


  return (
    <div>
      <Buttons />
      <Authors
        authors={authorQuery.data.allAuthors}
        show={page === 'authors'}
      />

      <Books
        books={bookQuery.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommend'}
      />

      <LoginForm
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />
    </div>
  )
}

export default App