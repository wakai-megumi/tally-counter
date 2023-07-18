import { createStore, combineReducers } from 'redux';
import userReducer from './UserReducers'; // Create the rootReducer by combining all your reducers

const rootReducer = combineReducers({
    user: userReducer
})
const store = createStore(rootReducer);

export default store;
