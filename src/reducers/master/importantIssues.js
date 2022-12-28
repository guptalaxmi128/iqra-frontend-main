import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    importantIssues: [],
    state: 'idle',
    error: null,
};

const importantIssuesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_IMPORTANT_ISSUES:
            return {
                ...state,
                importantIssues: [...state.importantIssues, action.payload],
            };
        case actionTypes.GET_IMPORTANT_ISSUES:
            return {
                ...state,
                importantIssues: action.payload,
            };
        default:
            return state;
    }
}

export default importantIssuesReducer;