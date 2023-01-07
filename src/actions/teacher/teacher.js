import { ADD_TEACHER, GET_TEACHER } from "constants/actionTypes";
import * as api from "api/index.js";

export const getTeacher = () => async (dispatch) => {
    try {
        const { data } = await api.getTeacher();
        dispatch({ type: GET_TEACHER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const addTeacher = (teacher) => async (dispatch) => {
    try {
        console.log(teacher)
        const { data } = await api.addTeacher(teacher);
        console.log(data)
        dispatch({ type: ADD_TEACHER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}
