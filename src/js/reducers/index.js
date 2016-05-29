import { combineReducers } from 'redux';
import formData from './formData';
import entries from './entries';
import { routerStateReducer } from 'redux-router';

const rootReducer = combineReducers({
  formData,
  entries,
  router: routerStateReducer,
});

export default rootReducer;
