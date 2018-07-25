import { combineReducers } from 'redux';
import userReducer from './userReducer';
import roomReducer from './roomReducer';

const reducers = combineReducers({
  user: userReducer,
  room: roomReducer,
});

export default reducers;
