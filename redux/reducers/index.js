import { combineReducers } from 'redux';
import userReducer from './userReducer';
import dataReducer from './dataReducer';

const Reducers = combineReducers({
  userState: userReducer,
  dataState: dataReducer,
});

export default Reducers;
