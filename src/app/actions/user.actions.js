import { LOADING_USERS, LOADING_USERS_ERROR, LOADING_USERS_SUCCESS } from './actiontypes';

export const getUsers = () => {
    return { type: LOADING_USERS };
}
