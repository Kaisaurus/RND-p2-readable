import {
  FETCH_POST_FAILED,
  FETCH_POSTS_FAILED,
  VOTE_POST_FAILED,
  EDIT_POST_FAILED,
  NEW_POST_FAILED,
  VOTE_POST_FULFILLED,
  EDIT_POST_FULFILLED,
  NEW_POST_FULFILLED
} from '../actions/postActions';

import { FETCH_CATEGORIES_FAILED } from '../actions/categoryActions';


const defaultState = {
  alertMsg: '',
  alertType: '',
};

const alert = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POST_FAILED:
    case FETCH_POSTS_FAILED:
    case VOTE_POST_FAILED:
    case EDIT_POST_FAILED:
    case NEW_POST_FAILED:
    case FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        alertMsg: `!PANIC!? ERROR:${action.payload}`,
        alertType: 'error',
      };
    case  VOTE_POST_FULFILLED:
      return {
        ...state,
        alertMsg: 'Post vote succesfully cast',
        alertType: 'success',
      };
    case  EDIT_POST_FULFILLED:
      return {
        ...state,
        alertMsg: 'New post succesfully edited',
        alertType: 'success',
      };
    case  NEW_POST_FULFILLED:
      return {
        ...state,
        alertMsg: 'New post succesfully created',
        alertType: 'success',
      };
    default:
      return state;
  }
};

export default alert;
