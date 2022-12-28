import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    editorial: [],
    state: 'idle',
    error: null
};

export const editorialReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EDITORIAL:
            return {
                ...state,
                editorial: action.payload.editorial
            };
        case actionTypes.GET_EDITORIAL:
            return {
                ...state,
                editorial: action.payload.editorial
            };
        default:
            return state;
    }
};

export default editorialReducer;