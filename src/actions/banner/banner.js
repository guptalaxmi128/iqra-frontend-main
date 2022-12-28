import { ADD_BANNER, GET_BANNER} from "constants/actionTypes";
import * as api from "api/index.js";

export const getBanner= () => async (dispatch) => {
    try {
        const { data } = await api.getBanner();
        dispatch({ type: GET_BANNER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const addBanner = (banner) => async (dispatch) => {
    try {
        const { data } = await api.addTeacher(banner);
        dispatch({ type: ADD_BANNER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}
