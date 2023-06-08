// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import contact from './contact';
import drawer from './drawer';
import accounts from './accounts';
import users from './users';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({menu,contact,drawer,accounts,users});

export default reducers;
