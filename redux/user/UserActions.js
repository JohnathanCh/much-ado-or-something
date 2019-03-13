/*--------------- Action Types ---------------*/
export const CREATE_USER = "CREATE_USER"
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"

/*--------------- Action Creators---------------*/
export const createUserAction= (user) => ({
    type: CREATE_USER,
    payload: {
        user: {...user},
        loggedIn: true
    }
})


/*--------------- Thunk Creators---------------*/
_signUpUser = (email, password) => {

    try {
      if(this.state.password.length < 6) {
        Alert.alert('Error', 'Please enter at Least 6 characters');
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        console.group();
        console.log("_signUp user uid:");
        console.log(user.user.uid);
        console.groupEnd();}
      )
    }
    catch(error){
      console.log(error.toString())
    }
  }


_logInUser = (email, password) => {

    try{

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( user => {console.log(user)})
    }
    catch(error){
        console.log(error.toString())
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
