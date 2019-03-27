import * as actions from './UserActions'

initialState = {
    user: {
        email: 'no email',
        uid: 'no uid'
    },
    loggedIn: false
}

const userReducer = (state= initialState, action) => {

    switch(action.type) {
        case actions.LOGIN_USER:        
        return {
            user: {...action.payload.user},
            loggedIn: action.payload.loggedIn,
        }

        case actions.LOGOUT_USER:     
            return { ...initialState }

        default:
            return state
    }
}

export default userReducer;