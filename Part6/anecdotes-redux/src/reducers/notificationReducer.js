const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'HIDE_NOTIFICATION':
            return null
        case 'CREATE_MESSAGE':
            return action.message
        case 'VOTE_MESSAGE':
            return action.message
        default: return state
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

export const createMessage = (anecdote) => {
    return {
        type: 'CREATE_MESSAGE',
        message: `${anecdote} has been added`
    }
}

export const voteMessage = (anecdote) => {
    return {
        type: 'VOTE_MESSAGE',
        message: `you voted '${anecdote}'`
    }
}


export default notificationReducer