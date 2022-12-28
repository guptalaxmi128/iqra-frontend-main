import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true
};

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ACTIVE_ITEM:
            return {
                ...state,
                openItem: action.payload.openItem
            };
        case actionTypes.ACTIVE_COMPONENT:
            return {
                ...state,
                openComponent: action.payload.openComponent
            };
        case actionTypes.OPEN_DRAWER:
            return {
                ...state,
                drawerOpen: action.payload.drawerOpen
            };
        case actionTypes.OPEN_COMPONENT_DRAWER:
            return {
                ...state,
                componentDrawerOpen: action.payload.componentDrawerOpen
            };
        default:
            return state;
    }
};

export default menuReducer;