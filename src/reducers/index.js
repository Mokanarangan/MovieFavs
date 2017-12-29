import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  ADD_TO_MY_MOVIES,
  REMOVE_FROM_MY_MOVIES,
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT
} from '../actions';

const initialState = {
  error: null,
  loading: false,
  movies: [],
  featuredTop: { full_backdrop_path: null, title: null, overview: null },
  featuredBottom: { full_backdrop_path: null, title: null, overview: null },
  myMovies: [],
  user: null
};

export function movieReducer(state=initialState, action) {
  switch (action.type) {
    // Loading
    case REQUEST_MOVIES:
      return Object.assign({}, state, {
        loading: true
      });
    // Home / Just Released
    case RECEIVE_MOVIES:
      return Object.assign({}, state, {
        featuredTop: action.featuredTop,
        featuredBottom: action.featuredBottom,
        movies: action.movies,
        loading: false
      });
    // My Movies: Add movie
    case ADD_TO_MY_MOVIES:
      let myMovies = state.myMovies;

      // Only add movie if it isn't already
      if (myMovies.map(m => m.title).indexOf(action.movie.title) < 0) {
        console.log('add!');
        myMovies = myMovies.concat(action.movie);
        // TODO: Save myMovies to user database
        // callDatabase().then(return new state object);
      }

      return Object.assign({}, state, {
        myMovies: myMovies,
        loading: false
      });
    // My Movies: Remove movie
    case REMOVE_FROM_MY_MOVIES:
      let myMovies = state.myMovies.filter(m => m.title !== action.movie.title);
      // TODO: Save myMovies to user database
      return Object.assign({}, state, {
        myMovies: myMovies,
        loading: false
      });
    // TODO: User: Register
    case USER_REGISTER:
      return Object.assign({}, state, {
        user: action.user
      });
    // TODO: User: Login
    case USER_LOGIN:
      return Object.assign({}, state, {
        user: action.user
      });
    // TODO: User: Logout
    case USER_LOGOUT:
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      break;
  }

  return state;
}
