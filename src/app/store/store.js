import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import UserReducers from './../reducers';
import Epics from './../epics';

const epics = createEpicMiddleware(Epics);

const store = createStore(UserReducers, applyMiddleware(epics));

export default store;