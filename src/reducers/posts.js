import {
  FETCH_POSTS_FULFILLED,
  FETCH_POSTS_FAILED
} from '../actions/postActions';

const defaultState = {
  fetching: true,
  posts: [],
};

const posts = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POSTS_FULFILLED:
      return {
        ...state,
        fetching: false,
        posts: action.payload,
      };
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        fetching: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default posts;
