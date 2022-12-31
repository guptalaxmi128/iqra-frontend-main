import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    editorials: [],
    state: 'idle',
    error: null
};

export const editorialReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EDITORIAL:
            return {
                ...state,
                editorials: action.payload.editorials
            };
        case actionTypes.GET_EDITORIAL:
            return {
                ...state,
                editorials: action.payload.editorials
            };
        default:
            return state;
    }
};

export default editorialReducer;