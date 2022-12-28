import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    liveClass: [],
    state: 'idle',
    error: null,
};

const liveClassReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_LIVECLASS:
            return {
                ...state,
                liveClass: [...state.liveClass, action.payload],
            };
        case actionTypes.GET_LIVECLASS:
            return {
                ...state,
                liveClass: action.payload,
            };
        default:
            return state;
    }
}

export default liveClassReducer;