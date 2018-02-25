import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';
import runbooksReducer from './runbooksReducer';
import commentsReducer from './commentsReducer';
import selectedRunbookReducer from './selectedRunbookReducer';
import editRunbookReducer from './editRunbookReducer';

export default combineReducers({
    editRunbookReducer,
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
  runbooks: runbooksReducer,
  selected: selectedRunbookReducer,
  comments: commentsReducer,
});
