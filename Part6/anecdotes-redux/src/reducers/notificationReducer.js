const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'HIDE_NOTIFICATION':
            return null
        case 'NOTIFICATION_MESSAGE':
            return action.message
        default: return state
    }
}

let hideTimeOut
export const setNotification = (message, seconds) => {
    clearTimeout(hideTimeOut)
    return async dispatch => {
        await dispatch({
            type: 'NOTIFICATION_MESSAGE',
            message: message
        })
        hideTimeOut = setTimeout(() =>
            dispatch({
                type: 'HIDE_NOTIFICATION',
            })
            , seconds * 1000)
    }
}

export default notificationReducer