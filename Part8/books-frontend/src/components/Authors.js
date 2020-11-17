
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [author, setAuthor] = useState(props.authors[0].name)
  const [birthYear, setbirthYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const authors = props.authors

  const submit = async (event) => {
    event.preventDefault()
    try {
      await editAuthor({
        variables: {
          name: author,
          setBornTo: parseInt(birthYear, 10),
        }
      })
    } catch (error) {
      window.alert(error)
    }


    // setAuthor('')
    setbirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        >
          {authors.map(author =>
            <option key={author.id}>{author.name}</option>
          )}
        </select>
        <div>
          born
          <input
            type='number'
            value={birthYear}
            onChange={({ target }) => setbirthYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
