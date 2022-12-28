import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    levels: [],
    state: 'idle',
    error: null,
};

const levelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LEVEL:
            return {
                ...state,
                levels: action.payload,
            };
        case actionTypes.ADD_LEVEL:
            return {
                ...state,
                levels: [...state.levels, action.payload],
            };
        default:
            return state;
    }
}

export default levelReducer;