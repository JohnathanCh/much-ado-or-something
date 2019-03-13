import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../redux/user/UserReducer'


const middleWare = applyMiddleware(thunk)

// const reducers = combineReducers({
//     user: userReducer
// })
const store = createStore(userReducer, middleWare)
// const store = createStore(userReducer)



window.store = store
// window.cardListReducer = cardListReducer

export default store