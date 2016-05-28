import * as types from '../constants/ActionTypes';

export function changeForm(name, value) {
  return {
    type: types.CHANGE_FORM,
    name,
    value,
  };
}

export function submitForm() {
  return {
    type: types.SUBMIT_FORM,
  };
}
