import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    articles: [],
    state: 'idle',
    error: null
};

export const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ARTICLE:
            return {
                ...state,
                articles: action.payload.articles
            };
        case actionTypes.GET_ARTICLE:
            return {
                ...state,
                articles: action.payload
            };
        default:
            return state;
    }
};

export default articleReducer;