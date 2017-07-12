import { LOADING_USERS, LOADING_USERS_ERROR, LOADING_USERS_SUCCESS, userActions } from './actiontypes';

export const getUsers = () => {
    return { type: LOADING_USERS };
};

export const deleteUser = (id) => {
    return { type: userActions.DELETEING_USER, payload: id };
};

export const deleteAccount = (id) => {
    return { type: userActions.DELETEING_ACCOUNT, payload: id };
};

export const postUser = (info) => {
    return { type: userActions.ADDING_USER, payload: info };
};

export const postAccount = (info) => {
    return { type: userActions.ADDING_ACCOUNT, payload: info };
};

export const getUser = (id) => {
    return { type: userActions.LOADING_SELECTED_USER, payload: id };
};

export const updateUser = (info) => {
    return { type: userActions.UPDATING_USER, payload: info };
};

export const getAccounts = () => {
    return { type: userActions.LOADING_ACCOUNT_TYPES };
};
