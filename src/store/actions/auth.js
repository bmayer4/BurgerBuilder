import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT    
    }
}

export const authResetError = () => {
    return {
        type: actionTypes.AUTH_RESET_ERROR   
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED
    }
}

export const authLogout = (error) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (idToken, localId) => {
    return {
        type: actionTypes.AUTH,
        token: idToken,
        userId: localId
    }
}

export const startAuth = (email, password, isSignUp) => {
    return (dispatch, getState) => {

        dispatch(authInit());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAVoiqOasIgCaojCjfwRZMK6sv5wVA-hGk';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAVoiqOasIgCaojCjfwRZMK6sv5wVA-hGk'
        }
        axios.post(url, authData).then((response) => {
            console.log('res data from auth action: ', response.data);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            dispatch(auth(response.data.idToken, response.data.localId));
        }).catch((error) => {
            console.log(error);
            dispatch(authFailed());
        });
    }
}

export const authSetRedirect = (path) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT,
        path: path
    }
}

export const authCheck = () => {
    console.log('auth check called');
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const localId = localStorage.getItem('userId');
            dispatch(auth(token, localId));
        }
    }
}