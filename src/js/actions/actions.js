import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { push } from 'redux-router';

export function changeRoute(newRoute) {
  return push(newRoute);
}
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
export function saveEntries(entries) {
  return {
    type: types.SAVE_ENTRIES,
    entries,
  };
}

export function addEntry() {
  return (dispatch, getState) => {
    const { formData } = getState();
    dispatch(submitForm());
    return axios.post('http://127.0.0.1:5000/entries', formData)
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log(response);
    });
  };
}
export function deleteEntry(id) {
  return (dispatch) =>
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:5000/entries',
      data: {
        id,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log(response);
    });
}

export function getEntries() {
  return (dispatch) => {
    return axios.get('http://127.0.0.1:5000/entries')
    .then(function (response) {
      return dispatch(saveEntries(response.data.entries));
    })
    .catch(function (response) {
      console.log(response);
    });
  };
}
