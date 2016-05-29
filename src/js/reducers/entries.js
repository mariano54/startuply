import * as types from '../constants/ActionTypes';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {

    case types.SAVE_ENTRIES: {
      if (action.entries !== undefined) return action.entries;
      return state;
    }
    default:
      return state;
  }
}
