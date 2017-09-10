const defaultState = {
  fetching: false,
  posts: [],
};

const posts = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_POST_FULFILLED':
      return {
        ...state,
        fetching: false,
        posts: action.payload,
      };
    case 'FETCH_POST_FAILED':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default posts;
