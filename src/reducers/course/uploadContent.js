import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    contents: [],
    state: 'idle',
    error: null,
};

const uploadContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_UPLOADCONTENT:
            return {
                ...state,
                contents: [...state.contents, action.payload],
            };
        case actionTypes.GET_UPLOADCONTENT:
            return {
                ...state,
                contents: action.payload,
            };
        default:
            return state;
    }
}

export default uploadContentReducer;


