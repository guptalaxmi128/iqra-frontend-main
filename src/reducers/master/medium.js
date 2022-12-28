import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    mediums: [],
    state: 'idle',
    error: null,
};

const mediumReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MEDIUM:
            return {
                ...state,
                mediums: action.payload,
            };
        case actionTypes.ADD_MEDIUM:
            return {
                ...state,
                mediums: [...state.mediums, action.payload],
            };
        default:
            return state;
    }
}

export default mediumReducer;