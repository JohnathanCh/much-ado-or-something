import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import UserReducer from '../redux/user/UserReducer';
import ToDoReducer from '../redux/to_dos/ToDoReducer';
import VisibilityFilterReducer from '../redux/visibility_filter/VisibilityFilterReducer';


const middleWare = applyMiddleware(thunk)

const reducers = combineReducers({
    User: UserReducer,
    ToDos: ToDoReducer,
    VisibilityFilter: VisibilityFilterReducer,
})
const store = createStore(reducers, middleWare)
// const store = createStore(userReducer)



window.store = store
// window.cardListReducer = cardListReducer

export default store