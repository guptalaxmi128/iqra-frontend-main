import { ADD_COURSE, GET_COURSE } from "constants/actionTypes";
import * as api from "api/index.js";

export const addCourse = (course) => async (dispatch) => {
    try {
        console.log(course);
        const { data } = await api.addCourse(course);
        dispatch({ type: ADD_COURSE, payload: data });
    } catch (error) {
        console.log(error);
    }
    }

export const getCourses = () => async (dispatch) => {
    try {
        const { data } = await api.getCourse();
        dispatch({ type: GET_COURSE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
