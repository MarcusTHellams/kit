import { combineReducers } from 'redux';
import UserReducer from './user.reducers';
const reducers = combineReducers({ app: UserReducer });
export default reducers;