import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    categories: [],
    state: 'idle',
    error: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORY:
            return {
                ...state,
                categories: action.payload,
            };
        case actionTypes.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        default:
            return state;
    }
}

export default categoryReducer;


