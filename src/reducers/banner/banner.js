import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    banner: [],
    state: 'idle',
    error: null,
};

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BANNER:
            return {
                ...state,
                banner: action.payload,
            };
        case actionTypes.ADD_TEACHER:
            return {
                ...state,
                banner: [...state.banner, action.payload],
            };
        default:
            return state;
    }
}

export default bannerReducer;
