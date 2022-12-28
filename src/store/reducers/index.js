// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import article from './article';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu , article});

export default reducers;
