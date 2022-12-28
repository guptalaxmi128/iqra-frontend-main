import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    teacher: [],
    state: 'idle',
    error: null,
};

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TEACHER:
            return {
                ...state,
                teacher: action.payload,
            };
        case actionTypes.ADD_TEACHER:
            return {
                ...state,
                teacher: [...state.teacher, action.payload],
            };
        default:
            return state;
    }
}

export default teacherReducer;
