import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { api, headers } from '../api-config';

export const FETCH_COMMENTS_FULFILLED = 'FETCH_COMMENTS_FULFILLED';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';
export const FETCHING_COMMENTS = 'FETCHING_COMMENTS';
export const EDIT_COMMENT_FULFILLED = 'EDIT_COMMENT_FULFILLED';
export const EDIT_COMMENT_FAILED = 'EDIT_COMMENT_FAILED';
export const NEW_COMMENT_FULFILLED = 'NEW_COMMENT_FULFILLED';
export const NEW_COMMENT_FAILED = 'NEW_COMMENT_FAILED';
export const DELETE_COMMENT_FULFILLED = 'DELETE_COMMENT_FULFILLED';
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED';
export const VOTE_COMMENT_FULFILLED = 'VOTE_COMMENT_FULFILLED';
export const VOTE_COMMENT_FAILED = 'VOTE_COMMENT_FAILED';

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

export function editComment(id, comment) {
  return dispatch => {
    axios
      .put(
        `${api}/comments/${id}`,
        { ...comment },
        { headers }
      )
      .then(resp => {
        dispatch({ type: EDIT_COMMENT_FULFILLED, payload: resp.data });
      })
      .catch(err => {
        dispatch({ type: EDIT_COMMENT_FAILED, payload: err });
      })
  }
}

export function newComment(comment) {
  return dispatch => {
    getUniqueId().then(id => {
      // post new post with unique id
      // I would prefer to do this on the back end rather than catching a error request
      // but for this assignment I'm not supposed to touch the back-end
      axios
        .post(
          `${api}/comments`,
          {...comment, id},
          { headers }
        )
        .then(resp => {
          dispatch({ type: NEW_COMMENT_FULFILLED, payload: resp.data });
        })
        .catch(err => {
          dispatch({ type: NEW_COMMENT_FAILED, payload: err });
        })
    }).catch(err => {
      dispatch({ type: NEW_COMMENT_FAILED, payload: err });
    })
  }
}

const getUniqueId = _ => checkUniqueId(uuidv4());

const checkUniqueId = id => {
  return (
    axios
      .get(`${api}/comments/${id}`, { headers })
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

export function deleteComment(id) {
  return dispatch => {
    axios.delete(`${api}/comments/${id}`, { headers })
      .then(resp => {
        dispatch({ type: DELETE_COMMENT_FULFILLED, payload: id });
      })
      .catch(err => {
        dispatch({ type: DELETE_COMMENT_FAILED, payload: err });
      });
  };
}

export function vote(id, vote) {
  return dispatch => {
    axios.post(`${api}/comments/${id}`, { option: vote } , { headers })
      .then(resp => {
        dispatch({ type: VOTE_COMMENT_FULFILLED, payload: { data: resp.data, id: id } });
      })
      .catch(err => {
        dispatch({ type: VOTE_COMMENT_FAILED, payload: err });
      });
  };
}