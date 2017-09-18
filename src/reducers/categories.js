import { FETCH_CATEGORIES_FULFILLED, FETCH_CATEGORIES_FAILED } from '../actions/categoryActions';

const defaultState = {
  fetching: false,
  categories: [],
};

const categories = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_FULFILLED:
      return {
        ...state,
        fetching: false,
        categories: action.payload.categories,
      };
    case FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categories;
