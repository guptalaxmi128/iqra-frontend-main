import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    subjects: [],
    state: 'idle',
    error: null,
};

const subjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SUBJECT:
            return {
                ...state,
                subjects: action.payload,
            };
        case actionTypes.ADD_SUBJECT:
            return {
                ...state,
                subjects: [...state.subjects, action.payload],
            };
        default:
            return state;
    }
}

export default subjectReducer;