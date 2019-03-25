/*--------------- Action Types ---------------*/
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

/*--------------- Action Creators---------------*/
export const loginUserAction= (user) => ({
    type: LOGIN_USER,
    payload: {
        user: {...user},
        loggedIn: true
    }
})

export const logoutUserAction = () => ({
    type: LOGOUT_USER,
    payload: {
      user: {
        email: 'no email',
        uid: 'no uid'
    },
    loggedIn: false
    }
})


/*--------------- Thunk Creators---------------*/
export const logInUserThunk = (user) => {

  return function thunk(dispatch) {
     return dispatch(loginUserAction(user))
  }
}

