import * as actions from './ToDoActions'

const toDoReducer = (state = [], action) => {

    switch(action.type) {
        case actions.GET_NOTES:        
        return {
            notes: [...action.payload.notes]
        }

        case actions.ADD_NOTE:     
            return { 
                notes: state.notes.push(action.payload.note)
            }

        case actions.DELETE_NOTE:
            return {
                notes: state.notes.filter(note => note.id === action.payload.noteId)
            }
        default:
            return state
    }
}

export default userReducer;