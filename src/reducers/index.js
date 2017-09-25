import { combineReducers } from 'redux';

import posts from './posts';
import categories from './categories';
import comments from './comments';
import alert from './alert';

const reducers = combineReducers({
  categories,
  comments,
  posts,
  alert,
});

export default reducers;
