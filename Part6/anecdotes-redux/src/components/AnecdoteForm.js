import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()
    const createAnecdote =  async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(anecdote)
        props.setNotification(`'${anecdote}' has been added`, 5)
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

const mapDispatchToProps = {
    addAnecdote,
    setNotification
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)