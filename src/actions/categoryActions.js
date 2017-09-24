import axios from 'axios';

import { api, headers } from '../api-config';

export const FETCH_CATEGORIES_FULFILLED = 'FETCH_CATEGORIES_FULFILLED';
export const FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED';

export function fetchCategories() {
  return (dispatch) => {
    axios.get(`${api}/categories`, { headers })
      .then((resp) => {
        dispatch({ type: FETCH_CATEGORIES_FULFILLED, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_CATEGORIES_FAILED, payload: err });
      });
  };
}
