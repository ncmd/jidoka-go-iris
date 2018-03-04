import { combineReducers } from 'redux';
import runbooksReducer from './runbooksReducer';

export default combineReducers({
  runbooks: runbooksReducer,
});
