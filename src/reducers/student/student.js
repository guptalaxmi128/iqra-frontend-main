import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    student: [],
    state: 'idle',
    error: null,
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_STUDENT:
            return {
                ...state,
                student: action.payload,
            };
        case actionTypes.ADD_STUDENT:
            return {
                ...state,
                student: [...state.student, action.payload],
            };
        default:
            return state;
    }
}

export default studentReducer;