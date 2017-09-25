import {
  FETCH_COMMENTS_FULFILLED,
  FETCH_COMMENTS_FAILED,
  FETCHING_COMMENTS
} from '../actions/commentActions';

const defaultState = {
  fetching: true,
  comments: [],
};

const comments = (state = defaultState, action) => {
  switch (action.type) {
    case FETCHING_COMMENTS:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_COMMENTS_FULFILLED:
      return {
        ...state,
        fetching: false,
        comments: action.payload,
      };
    case FETCH_COMMENTS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default comments;
