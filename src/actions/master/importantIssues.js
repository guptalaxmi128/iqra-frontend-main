import { ADD_IMPORTANT_ISSUES, GET_IMPORTANT_ISSUES } from "constants/actionTypes";
import * as api from "api/index.js";

export const addImportantIssues = (importantIssues) => async (dispatch) => {
    try {
        const { data } = await api.addImportantIssue(importantIssues);
        dispatch({ type: ADD_IMPORTANT_ISSUES, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getImportantIssues = () => async (dispatch) => {
    try {
        const { data } = await api.getImportantIssue();
        dispatch({ type: GET_IMPORTANT_ISSUES, payload: data });
    } catch (error) {
        console.log(error);
    }
}