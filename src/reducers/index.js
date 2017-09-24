import { combineReducers } from 'redux';

import posts from './posts';
import post from './post';
import categories from './categories';
// import comments from './comments';
import alert from './alert';

const reducers = combineReducers({
  categories,
  // comments,
  posts,
  post,
  alert,
});

export default reducers;
