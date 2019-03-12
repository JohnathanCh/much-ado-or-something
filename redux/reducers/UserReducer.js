initialState = {
    user: {
        email: 'no email',
        name: 'no name'

    }
}

const userReducer = (state= initialState) => {
    console.log("inside userReducer")
    return state
}

export default userReducer