import { LOGIN, SIGNUP, LOGOUT, LOGGEDIN } from '../../constants/actionTypes';
import * as api from 'api';

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        dispatch({ type: SIGNUP, payload: data });
        history('/');
    } catch (error) {
        console.log(error);
    }
};

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData);
        dispatch({ type: LOGIN, payload: data });
        history('/')
    } catch (error) {
        console.log(error);
    }
}

export const logout = (history) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT});
        history('/');
    } catch (error) {
        console.log(error);
    }
}

export const loggedIn = (history) => async (dispatch) => {
    try {
        const { data } = await api.admin();
        dispatch({ type: LOGGEDIN, payload: data });
        history('/');
    } catch (error) {
        console.log(error);
    }
}
