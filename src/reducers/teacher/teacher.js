import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    teachers: [],
    state: 'idle',
    error: null,
};

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TEACHER:
            return {
                ...state,
                teachers: action.payload,
            };
        case actionTypes.ADD_TEACHER:
            return {
                ...state,
                teachers: [...state.teachers, action.payload],
            };
        default:
            return state;
    }
}

export default teacherReducer;
