import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { api, headers } from '../api-config';

export const FETCHING_POST = 'FETCHING_POST';
export const FETCH_POST_FULFILLED = 'FETCH_POST_FULFILLED';
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED';
export const FETCH_POSTS_FULFILLED = 'FETCH_POSTS_FULFILLED';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const NEW_POST_FULFILLED = 'NEW_POST_FULFILLED';
export const NEW_POST_FAILED = 'NEW_POST_FAILED';
export const VOTE_POST_FULFILLED = 'VOTE_POST_FULFILLED';
export const VOTE_POST_FAILED = 'VOTE_POST_FAILED';
export const EDIT_POST_FULFILLED = 'EDIT_POST_FULFILLED';
export const EDIT_POST_FAILED = 'EDIT_POST_FAILED';
export const DELETE_POST_FULFILLED = 'DELETE_POST_FULFILLED';
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED';

export function newPost(post) {
  return dispatch => {
    getUniqueId().then(id => {
      // post new post with unique id
      // I would prefer to do this on the back end rather than catching a error request
      // but for this assignment I'm not supposed to touch the back-end
      axios
        .post(
          `${api}/posts`,
          {...post, id},
          { headers }
        )
        .then(resp => {
          dispatch({ type: NEW_POST_FULFILLED, payload: resp.data });
        })
        .catch(err => {
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

export function editPost(id, post) {
  return dispatch => {
    axios
      .put(
        `${api}/posts/${id}`,
        {...post},
        { headers }
      )
      .then(resp => {
        dispatch({ type: EDIT_POST_FULFILLED, payload: resp.data });
      })
      .catch(err => {
        dispatch({ type: EDIT_POST_FAILED, payload: err });
      })
  }
}

export function fetchPosts(category = null) {
  return dispatch => {
    dispatch({ type: FETCHING_POST });
    const url = category ? `/${category}/posts` : `/posts`;
    axios
      .get(`${api}${url}`, { headers })
      .then(resp => {
        dispatch({ type: FETCH_POSTS_FULFILLED, payload: resp.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_POSTS_FAILED, payload: err });
      });
  }
}

export function fetchPost(id) {
  return dispatch => {
    dispatch({ type: FETCHING_POST });
    axios.get(`${api}/posts/${id}`, { headers })
      .then(resp => {
        dispatch({ type: FETCH_POST_FULFILLED, payload: resp.data });
      })
      .catch(err => {
        dispatch({ type: FETCH_POST_FAILED, payload: err });
      });
  };
}

export function vote(id, vote) {
  return dispatch => {
    axios.post(`${api}/posts/${id}`, { option: vote } , { headers })
      .then(resp => {
        dispatch({ type: VOTE_POST_FULFILLED, payload: { data: resp.data, id: id } });
      })
      .catch(err => {
        dispatch({ type: VOTE_POST_FAILED, payload: err });
      });
  };
}

export function deletePost(id) {
  return dispatch => {
    axios.delete(`${api}/posts/${id}`, { headers })
      .then(resp => {
        dispatch({ type: DELETE_POST_FULFILLED, payload: id });
      })
      .catch(err => {
        dispatch({ type: DELETE_POST_FAILED, payload: err });
      });
  };
}