import axios from 'axios';
import { api, headers } from '../api-config';

export const FETCH_COMMENTS_FULFILLED = 'FETCH_COMMENTS_FULFILLED';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';
export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';

export function fetchComments(postId) {
  return (dispatch) => {
    dispatch({ type: FETCHING_COMMENTS });
    axios.get(`${api}/posts/${postId}/comments`, { headers })
      .then((resp) => {
        dispatch({ type: FETCH_COMMENTS_FULFILLED, payload: resp.data });
      })
      .catch((err) => {
        dispatch({ type: FETCH_COMMENTS_FAILED, payload: err });
      });
  };
}