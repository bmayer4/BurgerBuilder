import * as actionTypes from './../actions/actionTypes';


const initialState = {
  token: null,  //probably do not need to store token in redux store
  userId: null, 
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.AUTH_INIT):
            return {
                ...state,
                error: null,
                loading: true
            }
        case (actionTypes.AUTH):
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            }
        case (actionTypes.AUTH_FAILED):
            return {
                ...state,
                error: true,
                loading: false
            }
        case (actionTypes.AUTH_RESET_ERROR):
            return {
                ...state,
                error: false
            }
        case (actionTypes.AUTH_LOGOUT):
            return {
                ...state,
                token: null,
                userId: null
            }
        case (actionTypes.AUTH_SET_REDIRECT):
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }
}

export default authReducer;