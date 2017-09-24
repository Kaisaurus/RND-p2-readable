import {
  FETCH_POST_FULFILLED,
  FETCH_POST_FAILED,
  VOTE_POST_FULFILLED,
  VOTE_POST_FAILED,
  EDIT_POST_FULFILLED,
  EDIT_POST_FAILED,
  NEW_POST_FULFILLED,
  NEW_POST_FAILED,
} from '../actions/postActions';

const defaultState = {
  fetching: true,
  voteCast: false,
  submittedId: '',
};

const post = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POST_FULFILLED:
      return {
        ...state,
        fetching: false,
        post: action.payload,
        submittedId: '',
      };
    case FETCH_POST_FAILED:
      return {
        ...state,
        fetching: true,
        error: action.payload,
      };
    case VOTE_POST_FULFILLED:
      return {
        ...state,
        voteCast: true,
      };
    case VOTE_POST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_POST_FULFILLED:
      return {
        ...state,
        submittedId: action.payload.id,
      };
    case NEW_POST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case EDIT_POST_FULFILLED:
      return {
        ...state,
        submittedId: action.payload.id,
      };
    case EDIT_POST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default post;
