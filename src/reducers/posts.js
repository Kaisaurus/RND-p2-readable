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
  DELETE_POST_FULFILLED,
  DELETE_POST_FAILED,
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
      return defaultState;
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
      const postsAfterVote = state.posts.map(p => {
        if(p.id === action.payload.id) {
          return {...p, voteScore};
        }
        return p;
      });
      return {
        ...state,
        post: { ...state.post, voteScore },
        posts: postsAfterVote,
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
    case DELETE_POST_FULFILLED:
      const postsAfterDelete = state.posts.map(p => {
        if(p.id === action.payload) {
          return {...p, deleted: true};
        }
        return p;
      });
      return {
        ...state,
        post: { ...state.post, deleted: true },
        posts: postsAfterDelete,
      };
    case DELETE_POST_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default posts;
