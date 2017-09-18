import { combineReducers } from 'redux';

import posts from './posts';
import post from './post';
import categories from './categories';
import comments from './comments';

const reducers = combineReducers({
  categories,
  comments,
  posts,
  post,
});

export default reducers;
