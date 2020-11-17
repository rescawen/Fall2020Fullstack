import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
    
    const favoriteGenre = localStorage.getItem('favoriteGenre')
    const recommendedBookQuery = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre }
    })

    if (!props.show) {
        return null
    }

    const books = recommendedBookQuery.data.allBooks
    return (
        <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre <b>{favoriteGenre}</b></p>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    )
}

export default Recommendations