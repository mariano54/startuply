/**
 * Another clever approach of writing reducers:
 *
 * export default function(state = initialState, action) {
 *   const actions = {
 *      [ACTION_TYPE]: () => [action.payload.data, ...state]
 *   };
 *
 *   return (_.isFunction(actions[action.type])) ? actions[action.type]() : state
 * }
 */

import * as types from '../constants/ActionTypes';
import { assign } from 'lodash';

const initialState = {
  name: '',
  industry: 'ai',
  description: '',
  size: '',
  funding: '',
  founders: '',
  star: false,
  submitted: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case types.CHANGE_FORM: {
      const newObj = {};
      newObj[action.name] = action.value;
      return assign({}, state, newObj);
    }

    case types.SUBMIT_FORM:
      return assign({}, state, {
        submitted: true,
      });

    default:
      return state;
  }
}
