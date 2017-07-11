import { LOADING_USERS, LOADING_USERS_SUCCESS, LOADING_USERS_ERROR } from './../actions/actiontypes';


const INITIAL_STATE = [];
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING_USERS_SUCCESS:
            return [...state, ...action.payload];
        case LOADING_USERS_ERROR:
            return [...state, ...action.payload];
        default:
            return state;
    }
};

export default userReducer;