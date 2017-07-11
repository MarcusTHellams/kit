import 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/fromPromise';
import Rx from 'rxjs';
import { LOADING_USERS, LOADING_USERS_SUCCESS, LOADING_USERS_ERROR } from './../actions/actiontypes';
import appService from './../services/app.service';


export const getUsersEpic = (action$, store) => {
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
        })

}