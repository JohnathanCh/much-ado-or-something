/*--------------- Action Types ---------------*/
export const GET_NOTES = "GET_NOTES"
export const ADD_NOTE = "ADD_NOTE"
export const DELETE_NOTE = "DELETE_NOTE"

/*--------------- Action Creators---------------*/
export const getNotesAction= (notes) => ({
    type: GET_NOTES,
    payload: {
        notes: notes
    }
})

export const logoutUserAction = (note) => ({
    type: ADD_NOTE,
    payload: {
        notes: notes.push(note)
    }
})

export const logoutUserAction = (noteId) => ({
    // I will need to set this one up a bit more
    type: DELETE_NOTE,
    payload: {
        notes: notes.filter(note => note.id != noteId)
    }
})


/*--------------- Thunk Creators---------------*/
export const logInUserThunk = (user) => {

  return function thunk(dispatch) {
     return dispatch(loginUserAction(user))
  }
}


// Data structure of Notes being sent from firebase
// Object {
//     "-Lb1B7Y69ggfDVdKFm6E": Object {
//       "date": "2019/3/27",
//       "note": "23",
//     },
//     "-Lb1B8740c20B6u6XEPs": Object {
//       "date": "2019/3/27",
//       "note": "24",
//     },
//   }

