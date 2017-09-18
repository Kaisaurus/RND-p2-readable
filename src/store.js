import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
// 'createLogger' is specifically imported because if the whole logger
// is imported it throws the type error: middleware is not a function
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(
  applyMiddleware(
    promise(),
    thunk,
    createLogger(),
  )
);


export default createStore(reducers, middleware);
