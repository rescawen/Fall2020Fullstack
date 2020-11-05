import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    // const anecdotes = useSelector(state => state.anecdotes)
    // const dispatch = useDispatch()
    const vote = (anecdote) => {
        anecdote.votes = anecdote.votes + 1
        // dispatch(voteAnecdote(anecdote))
        // dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
        props.voteAnecdote(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }
    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)