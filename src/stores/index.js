import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {movieReducer} from '../reducers';

export default createStore(
  movieReducer,
  applyMiddleware(thunk)
);
