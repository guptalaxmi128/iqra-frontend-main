import { ADD_EDITORIAL, GET_EDITORIAL } from 'constants/actionTypes';
import * as api from '../../api/index';

export const addEditorial = (editorial) => async (dispatch) => {
    try {
        const { data } = await api.addEditorial(editorial);
        dispatch({ type: ADD_EDITORIAL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getEditorial = () => async (dispatch) => {
    try {
        const { data } = await api.getEditorial();
        dispatch({ type: GET_EDITORIAL, payload: data });
    } catch (error) {
        console.log(error);
    }
};
