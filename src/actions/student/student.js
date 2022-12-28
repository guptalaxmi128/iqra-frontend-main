import { ADD_STUDENT, GET_STUDENT } from "constants/actionTypes";
import * as api from "api/index.js";

export const getStudent = () => async (dispatch) => {
    try {
        const { data } = await api.getStudent();
        dispatch({ type: GET_STUDENT, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const addStudent = (student) => async (dispatch) => {
    try {
        const { data } = await api.addStudent(student);
        dispatch({ type: ADD_STUDENT, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}
