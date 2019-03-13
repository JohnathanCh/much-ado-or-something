import * as actions from './UserActions'

initialState = {
    user: {
        email: 'no email',
        name: 'no name'
    },
    loggedIn: false
}

const userReducer = (state= initialState, action) => {
    console.log("inside userReducer")
    
    switch(action.type) {
        case actions.CREATE_USER:

        return {
            user: {
                id: action.payload.user.id,
                name: action.payload.user.name,
            },
            loggedIn: action.payload.loggedIn
        }

        case actions.LOGIN_USER:        

        return {
            user: {
                id: action.payload.user.id,
                name: action.payload.user.username,
            },
            loggedIn: action.payload.loggedIn,
        }

        case actions.LOGOUT_USER:     
            return { ...initialState }

        default:
            return state
    }
}

export default userReducer;