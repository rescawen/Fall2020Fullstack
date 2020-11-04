import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, createMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(anecdote))
        dispatch(createMessage(anecdote))
        setTimeout(() => {
            dispatch(hideNotification())
          }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm