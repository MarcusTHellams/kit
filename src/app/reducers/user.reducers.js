import { LOADING_USERS, LOADING_USERS_SUCCESS, LOADING_USERS_ERROR, userActions } from './../actions/actiontypes';


const INITIAL_STATE = {
    users: [],
    selectedUser: {},
    accountTypes: []
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING_USERS_SUCCESS:
            return Object.assign({}, state, { users: [...action.payload] });
        case LOADING_USERS_ERROR:
            return Object.assign({}, state, { users: [...action.payload] });
        case userActions.LOADING_SELECTED_SUCCESS:
            return Object.assign({}, state, { selectedUser: action.payload });
        case userActions.LOADING_SELECTED_ERROR:
            return Object.assign({}, state, { selectedUser: action.payload });
        case userActions.LOADING_ACCOUNT_SUCCESS:
            return Object.assign({}, state, { accountTypes: [...action.payload] });
        case userActions.UPDATING_USER_SUCCESS:
            return Object.assign({}, state, { selectedUser: action.payload });
        case userActions.UPDATING_USER_ERROR:
            return Object.assign({}, state, { selectedUser: action.payload });
        default:
            return state;
    }
};

export default userReducer;