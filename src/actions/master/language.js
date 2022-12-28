import { ADD_LANGUAGE, GET_LANGUAGE } from "constants/actionTypes";
import * as api from "api/index.js";

export const getLanguages = () => async (dispatch) => {
    try {
        const { data } = await api.getLanguage();
        dispatch({ type: GET_LANGUAGE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const addLanguage = (language) => async (dispatch) => {
    try {
        const { data } = await api.addLanguage(language);
        dispatch({ type: ADD_LANGUAGE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}
