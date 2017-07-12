import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import UserReducers from './../reducers';
import Epics from './../epics';

const epics = createEpicMiddleware(Epics);

const store = createStore(UserReducers, applyMiddleware(thunk, epics));

export default store;