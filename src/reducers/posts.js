import {
  FETCHING_POST,
  FETCH_POST_FULFILLED,
  FETCH_POST_FAILED,
  VOTE_POST_FULFILLED,
  VOTE_POST_FAILED,
  EDIT_POST_FULFILLED,
  EDIT_POST_FAILED,
  NEW_POST_FULFILLED,
  NEW_POST_FAILED,
  FETCH_POSTS_FULFILLED,
  FETCH_POSTS_FAILED,
} from '../actions/postActions';

const defaultState = {
  fetching: true,
  posts: [],
  submittedId: '',
  post: {},
};

const posts = (state = defaultState, action) => {
  switch (action.type) {
    case FETCHING_POST:
      return {
        ...state,
        fetching: true,
      }
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
    case VOTE_POST_FULFILLED:
      const { voteScore } = action.payload.data;
      const { id } = action.payload;
      const newPosts = state.posts.map(p => {
        if(p.id === id) {
          return {...p, voteScore};
        }
        return p;
      });
      return {
        ...state,
        post: { ...state.post, voteScore },
        posts: newPosts,
      };
    case VOTE_POST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_POSTS_FULFILLED:
      return {
        ...state,
        fetching: false,
        posts: action.payload,
      };
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default posts;
