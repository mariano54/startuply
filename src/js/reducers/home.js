import * as types from '../constants/ActionTypes';

const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {

    case types.SET_PAGE: {
      return action.page;
    }
    default:
      return state;
  }
}
