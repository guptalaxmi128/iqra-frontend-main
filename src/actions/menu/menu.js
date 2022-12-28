import { ACTIVE_COMPONENT, ACTIVE_ITEM, OPEN_DRAWER, OPEN_COMPONENT_DRAWER} from "../../constants/actionTypes";

export const activeItem = (payload) => ({
    type: ACTIVE_ITEM,
    payload
});

export const activeComponent = (payload) => ({
    type: ACTIVE_COMPONENT,
    payload
});

export const openDrawer = (payload) => ({
    type: OPEN_DRAWER,
    payload
});

export const openComponentDrawer = (payload) => ({
    type: OPEN_COMPONENT_DRAWER,
    payload
});
