import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { LOADING_USERS, LOADING_USERS_ERROR, LOADING_USERS_SUCCESS, userActions } from './../actions/actiontypes';
import 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/fromPromise';
import Rx from 'rxjs';

export default function (ngModule) {
    ngModule.factory('userEpic', UserEpic);
    UserEpic.$inject = ['appService'];
    function UserEpic(appService) {

        const getUsersEpic = (action$, store) => {
            return action$
                .ofType(LOADING_USERS)
                .switchMap(() => {
                    return Rx
                        .Observable
                        .fromPromise(appService.getUsers());
                })
                .map((resp) => {
                    return { type: LOADING_USERS_SUCCESS, payload: resp };
                })
                .catch((err) => {
                    return Rx
                        .Observable
                        .of({ type: LOADING_USERS_ERROR, payload: err });
                });

        };

        const deleteUserEpic = (action$, store) => {
            return action$
                .ofType(userActions.DELETEING_USER)
                .switchMap((action) => {
                    return Rx
                        .Observable
                        .fromPromise(appService.deleteUser(action.payload));
                })
                .map((resp) => {
                    return { type: LOADING_USERS };
                })
                .catch((err) => {
                    return Rx
                        .Observable
                        .of({ type: userActions.DELETEING_USER_ERROR, payload: err });
                });

        };

        const postUserEpic = (action$, store) => {
            return action$
                .ofType(userActions.ADDING_USER)
                .switchMap((action) => {
                    return Rx
                        .Observable
                        .fromPromise(appService.addUser(action.payload));
                })
                .map((resp) => {
                    return { type: LOADING_USERS };
                })
                .catch((err) => {
                    return Rx
                        .Observable
                        .of({ type: userActions.ADDING_USER_ERROR, payload: err });
                });

        };

        const selectUserEpic = (action$, store) => {
            return action$
                .ofType(userActions.LOADING_SELECTED_USER)
                .switchMap((action) => {
                    return Rx
                        .Observable
                        .fromPromise(appService.getUser(action.payload));
                })
                .map((resp) => {
                    return { type: userActions.LOADING_SELECTED_SUCCESS, payload: resp };
                })
                .catch((err) => {
                    return Rx
                        .Observable
                        .of({ type: userActions.LOADING_SELECTED_ERROR, payload: err });
                });

        };


        return createEpicMiddleware(combineEpics(postUserEpic, deleteUserEpic, getUsersEpic, selectUserEpic));
        //end of factory function
    }
}