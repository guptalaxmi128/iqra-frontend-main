import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    banners: [],
    state: 'idle',
    error: null,
};

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BANNER:
            return {
                ...state,
                banners: action.payload,
            };
        case actionTypes.ADD_BANNER:
            return {
                ...state,
                banners: [...state.banners, action.payload],
            };
        default:
            return state;
    }
}

export default bannerReducer;
