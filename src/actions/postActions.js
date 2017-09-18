import axios from 'axios';
import uuidv4 from 'uuid/v4';

import { api, headers } from '../api-config';

export const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED';
export const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const NEW_POST_FULFILLED = 'NEW_POST_FULFILLED';
export const NEW_POST_FAILED = 'NEW_POST_FAILED';

export function newPost(post) {
  return dispatch => {
    getUniqueId().then(id => {
      // post new post with unique id
      axios
        .post(
          `${api}/posts`,
          {...post, id},
          { headers }
        )
        .then(resp => {
          dispatch({ type: NEW_POST_FULFILLED, payload: resp });
        })
        .catch(err => {
          console.log(err.response.data.error);
          dispatch({ type: NEW_POST_FAILED, payload: err });
        })
    }).catch(err => {
      dispatch({ type: NEW_POST_FAILED, payload: err });
    })
  }
}

const getUniqueId = _ => checkUniqueId(uuidv4());

const checkUniqueId = id => {
  return (
    axios
      .get(`${api}/posts/${id}`, { headers })
      .then(resp => checkUniqueId(uuidv4()))
      .catch(err => {
        if(err.response.status === 500) {
          return id;
        } else {
          throw err;
        }
      }
  ));
}

export function fetchPosts() {
  return dispatch => {
    axios.get(`${api}/posts`, { headers })
      .then(resp => {
        dispatch({ type: FETCH_POSTS_FULFILLED, payload: resp.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_POSTS_FAILED, payload: err });
      });
  };
}

export function fetchPost(id) {
  return dispatch => {
    axios.get(`${api}/posts/${id}`, { headers })
      .then(resp => {
        dispatch({ type: FETCH_POST_FULFILLED, payload: resp.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_POST_FAILED, payload: err });
      });
  };
}
