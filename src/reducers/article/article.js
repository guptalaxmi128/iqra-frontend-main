import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    article: [],
    state: 'idle',
    error: null
};

export const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ARTICLE:
            return {
                ...state,
                article: action.payload.article
            };
        case actionTypes.GET_ARTICLE:
            return {
                ...state,
                article: action.payload.article
            };
        default:
            return state;
    }
};

export default articleReducer;