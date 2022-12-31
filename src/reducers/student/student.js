import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    students: [],
    state: 'idle',
    error: null,
};

const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_STUDENT:
            return {
                ...state,
                students: action.payload,
            };
        case actionTypes.ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, action.payload],
            };
        default:
            return state;
    }
}

export default studentReducer;