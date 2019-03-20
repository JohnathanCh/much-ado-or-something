import * as actions from './UserActions'

initialState = {
    user: {
        email: 'no email',
        uid: 'no uid'
    },
    loggedIn: false
}

const userReducer = (state= initialState, action) => {
    console.log("inside userReducer")

    switch(action.type) {
        case actions.LOGIN_USER:        

        return {
            user: {
                uid: action.payload.user.uid,
                email: action.payload.user.email,
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