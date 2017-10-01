import { combineReducers } from 'redux';

import posts from './posts';
import categories from './categories';
import comments from './comments';
import alert from './alert';
import users from './users';

const reducers = combineReducers({
  categories,
  comments,
  posts,
  alert,
  users,
});

export default reducers;
