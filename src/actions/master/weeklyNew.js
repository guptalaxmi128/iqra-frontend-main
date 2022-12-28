import { ADD_WEEKLY_NEWS, GET_WEEKLY_NEWS } from "constants/actionTypes";
import * as api from "api/index.js";

export const addWeeklyNews = (weeklyNews) => async (dispatch) => {
    try {
        const { data } = await api.addWeeklyNews(weeklyNews);
        dispatch({ type: ADD_WEEKLY_NEWS, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getWeeklyNews = () => async (dispatch) => {
    try {
        const { data } = await api.getWeeklyNews();
        dispatch({ type: GET_WEEKLY_NEWS, payload: data });
    } catch (error) {
        console.log(error);
    }
}
