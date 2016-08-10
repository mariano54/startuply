import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { push } from 'redux-router';
const url = API_URL;

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
    return axios.post( `${url}/entries`, formData)
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      console.log(response);
    });
  };
}

export function deleteEntry(id) {
  return () =>
    axios({
      method: 'delete',
      url: `${url}/entries`,
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
export function setPage(page) {
  return {
    type: types.SET_PAGE,
    page,
  };
}

export function getEntries(page) {
  return (dispatch) =>
    axios.get(`${url}/entries?page=${page}`)
    .then(function (response) {
      return dispatch(saveEntries(response.data.entries));
    })
    .catch(function (response) {
      console.log(response);
    });
}
