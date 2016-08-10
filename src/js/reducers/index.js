import { combineReducers } from 'redux';
import formData from './formData';
import entries from './entries';
import home from './home';
import { routerStateReducer } from 'redux-router';

const rootReducer = combineReducers({
  formData,
  entries,
  home,
  router: routerStateReducer,
});

export default rootReducer;
