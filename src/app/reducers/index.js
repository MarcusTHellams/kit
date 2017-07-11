import { combineReducers } from 'redux';
import UserReducer from './user.reducers';
const reducers = combineReducers({ users: UserReducer });
export default reducers;