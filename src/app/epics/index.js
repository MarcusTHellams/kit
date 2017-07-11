import { combineEpics } from 'redux-observable';
import { getUsersEpic } from './user.epics';

export default combineEpics(getUsersEpic);