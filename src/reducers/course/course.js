import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    courses: [],
    state: 'idle',
    error: null,
};

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload],
            };
        case actionTypes.GET_COURSE:
            return {
                ...state,
                courses: action.payload,
            };
        default:
            return state;
    }
};

export default courseReducer;