import { ADD_UPLOADCONTENT, GET_UPLOADCONTENT } from "constants/actionTypes";
import * as api from "api/index.js";

export const addUploadContent = (uploadContent) => async (dispatch) => {
    try {
        const { data } = await api.addUploadcontent(uploadContent);
        dispatch({ type: ADD_UPLOADCONTENT, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getUploadContents = () => async (dispatch) => {
    try {
        const { data } = await api.getUploadcontent();
        dispatch({ type: GET_UPLOADCONTENT, payload: data });
    } catch (error) {
        console.log(error);
    }
}
