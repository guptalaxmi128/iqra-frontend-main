import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    weeklyNews: [],
    state: 'idle',
    error: null,
};

const weeklyNewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_WEEKLY_NEWS:
            return {
                ...state,
                weeklyNews: [...state.weeklyNews, action.payload],
            };
        case actionTypes.GET_WEEKLY_NEWS:
            return {
                ...state,
                weeklyNews: action.payload,
            };
        default:
            return state;
    }
}

export default weeklyNewsReducer;