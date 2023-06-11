// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import property from './property';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, property });

export default reducers;
