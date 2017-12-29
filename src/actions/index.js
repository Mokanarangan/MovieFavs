// Get TMBD's image settings:
// https://developers.themoviedb.org/3/getting-started/images
// https://developers.themoviedb.org/3/configuration/get-api-configuration
let _imageSettings;

// Base movie actions on Redux's Example Reddit API:
// https://redux.js.org/docs/advanced/ExampleRedditAPI.html

export const REQUEST_MOVIES = "REQUEST_MOVIES";
const requestMovies = () => {
  return {
    type: REQUEST_MOVIES
  };
};

export const RECEIVE_MOVIES = "RECEIVE_MOVIES";
const receiveMovies = json => {
  return {
    type: RECEIVE_MOVIES,
    featuredTop: json.featuredTop,
    featuredBottom: json.featuredBottom,
    movies: json.movies,
    receivedAt: Date.now()
  };
};

export const FETCH_MOVIES = "FETCH_MOVIES";

export const fetchMovies = () => {
  return {
    type: FETCH_MOVIES
  };
};

// My Movies actions:
export const ADD_TO_MY_MOVIES = "ADD_TO_MY_MOVIES";
export const addToMyMovies = movie => ({
  type: ADD_TO_MY_MOVIES,
  movie: movie
});

export const REMOVE_FROM_MY_MOVIES = "REMOVE_FROM_MY_MOVIES";
export const removeFromMyMovies = movie => ({
  type: REMOVE_FROM_MY_MOVIES,
  movie: movie
});

// TODO: User actions:
export const USER_REGISTER = "USER_REGISTER";
export const userRegister = (name, email, password) => ({
  type: USER_REGISTER,
  name: name,
  email: email,
  password: password
});

export const USER_LOGIN = "USER_LOGIN";
export const userLogin = (email, password) => ({
  type: USER_LOGIN,
  email: email,
  password: password
});

export const USER_LOGOUT = "USER_LOGOUT";
export const userLogout = () => ({
  type: USER_LOGOUT
});
