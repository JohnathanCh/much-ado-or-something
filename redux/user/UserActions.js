/*--------------- Action Types ---------------*/
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

/*--------------- Action Creators---------------*/
export const loginUserAction= (email, uid) => ({
    type: LOGIN_USER,
    payload: {
        user: {
          email: email,
          uid: uid
        },
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
export const _signUpUserThunk = (email, password) => {

  return function thunk(dispatch) {
    try {
      if(this.state.password.length < 6) {
        Alert.alert('Error', 'Please enter at Least 6 characters');
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password).then(userInfo => 
      dispatch(loginUserAction(email, userInfo.user.uid)))

      console.log("inside the _signUpUser thunk")
    }
    catch(error){
      console.log(error.toString())
    }
  }
}


export const _logInUser = (email, password) => {

  return function thunk(dispatch) {
    try{

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( user => {console.log(user)})
    }
    catch(error){
        console.log(error.toString())
    }
  }
}

async function _logInWithFacebook() {
    console.log("You Are in the _loginWithFacebook Function")

    const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync('800638413642073', {permissions: ['public_profile']})

    if(type == 'success'){
      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      let user = firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {console.log(error)})

        console.group()
        console.log("_logInWithFacebook user:")
        console.log(user)
        console.groupEnd()
    }
  }

module.exports._logInWithFacebook = _logInWithFacebook
