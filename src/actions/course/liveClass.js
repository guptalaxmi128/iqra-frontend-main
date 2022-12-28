import { ADD_LIVECLASS, GET_LIVECLASS } from 'constants/actionTypes';
import * as api from 'api/index.js';

export const addLiveClass = (liveClass) => async (dispatch) => {
    try {
        const { data } = await api.addLiveclass(liveClass);
        dispatch({ type: ADD_LIVECLASS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getLiveClasses = () => async (dispatch) => {
    try {
        const { data } = await api.getLiveclass();
        dispatch({ type: GET_LIVECLASS, payload: data });
    } catch (error) {
        console.log(error);
    }
};
