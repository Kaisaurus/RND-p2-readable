import {
  FETCH_COMMENTS_FULFILLED,
  FETCH_COMMENTS_FAILED,
  FETCHING_COMMENTS,
  EDIT_COMMENT_FULFILLED,
  EDIT_COMMENT_FAILED,
  NEW_COMMENT_FULFILLED,
  NEW_COMMENT_FAILED,
  DELETE_COMMENT_FULFILLED,
  DELETE_COMMENT_FAILED,
  VOTE_COMMENT_FULFILLED,
  VOTE_COMMENT_FAILED,
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
      };
    case NEW_COMMENT_FULFILLED:
      return {
        ...state,
        fetching: false,
        comments: [...state.comments, action.payload],
      };
    case EDIT_COMMENT_FULFILLED:
      const commentsBeforeEdit = state.comments.filter(oldComment => {
        return action.payload.id !== oldComment.id;
      });
      return {
        ...state,
        comments: [...commentsBeforeEdit, action.payload],
      };
    case FETCH_COMMENTS_FULFILLED:
      // filters existing comments state to only contains ones which do no exist in the new payload
      // so duplicates can be overriden by new one with same id
      const commentsBeforeFetch = state.comments.filter(oldComment => {
        return 1 > action.payload.filter(newComment => newComment.parentId === oldComment.parentId).length;
      });
      return {
        ...state,
        fetching: false,
        comments: [...commentsBeforeFetch, ...action.payload],
      };
    case DELETE_COMMENT_FULFILLED:
      const commentsAfterDelete = state.comments.map(comment => {
        if(comment.id === action.payload) {
          return {...comment, deleted: true};
        }
        return comment;
      });
      return {
        ...state,
        comments: commentsAfterDelete,
      };
    case VOTE_COMMENT_FULFILLED:
      const commentsAfterVote = state.comments.map(comment => {
        if(comment.id === action.payload.id) {
          return { ...comment, voteScore: action.payload.data.voteScore };
        }
        return comment;
      });
      return {
        ...state,
        comments: commentsAfterVote,
      }
    case VOTE_COMMENT_FAILED:
    case FETCH_COMMENTS_FAILED:
    case EDIT_COMMENT_FAILED:
    case NEW_COMMENT_FAILED:
    case DELETE_COMMENT_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default comments;
