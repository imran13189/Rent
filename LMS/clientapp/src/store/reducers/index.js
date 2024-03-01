// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import property from './property';
import users from './users'

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, property, users });

export default reducers;
