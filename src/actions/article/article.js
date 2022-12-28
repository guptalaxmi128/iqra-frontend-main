import { ADD_ARTICLE, GET_ARTICLE } from 'store/reducers/actions';
import * as api from 'api';

export const addArticle = (article) => async (dispatch) => {
    try {
        console.log(article);
        const { data } = await api.addArticle(article);
        dispatch({ type: ADD_ARTICLE, payload: article });
    } catch (error) {
        console.log(error);
    }
};

export const getArticle = () => async (dispatch) => {
    try {
        const { data } = await api.getArticle();
        dispatch({ type: GET_ARTICLE, payload: data });
    } catch (error) {
        console.log(error);
    }
};
