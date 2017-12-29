import fetch from 'cross-fetch';

// TMDB API key:
// https://www.themoviedb.org/settings/api
const API_KEY = 'cc6d2c6b137405f0457b9bdb5863c4ef';

// Get TMBD's image settings:
// https://developers.themoviedb.org/3/getting-started/images
// https://developers.themoviedb.org/3/configuration/get-api-configuration
let _imageSettings;

// Base movie actions on Redux's Example Reddit API:
// https://redux.js.org/docs/advanced/ExampleRedditAPI.html

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
const requestMovies = () => {
  return {
    type: REQUEST_MOVIES
  };
};

export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
const receiveMovies = (json) => {
  return {
    type: RECEIVE_MOVIES,
    featuredTop: json.featuredTop,
    featuredBottom: json.featuredBottom,
    movies: json.movies,
    receivedAt: Date.now()
  };
};

export const fetchMovies = () => {
  return dispatch => {
    dispatch(requestMovies());
    // Basically the same as…
    // dispatch(loading());

    // First get image settings
    const getImages = new Promise((resolve, reject) => {
      fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(json => {
          _imageSettings = json.images;
          resolve(json.images);
        });
    });

    // Then load movies
    const getMovies = new Promise((resolve, reject) => {
      getImages.then(() => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
          .then(response => response.json())
          .then(json => {
            resolve(json.results);
          });
      });
    });

    // Return movies via action
    return getMovies.then(json => {
      // Add full image paths
      let movies = json.map(movie => {
        // 'w300', 'w780', 'w1280', 'original'
        movie.full_backdrop_path = _imageSettings.base_url + 'w1280' + movie.backdrop_path;
        // 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'
        movie.full_poster_path = _imageSettings.base_url + 'w154' + movie.poster_path;
        return movie;
      });

      // Feature the 2 most popular movies
      let featured = movies
        .sort((a, b) => a.popularity < b.popularity)
        .slice(0, 2);

      dispatch(receiveMovies({
        featuredTop: featured[0],
        featuredBottom: featured[1],
        movies: movies
      }));
    });
  };
};


// My Movies actions:
export const ADD_TO_MY_MOVIES = 'ADD_TO_MY_MOVIES';
export const addToMyMovies = (movie) => ({
  type: ADD_TO_MY_MOVIES,
  movie: movie
});

export const REMOVE_FROM_MY_MOVIES = 'REMOVE_FROM_MY_MOVIES';
export const removeFromMyMovies = (movie) => ({
  type: REMOVE_FROM_MY_MOVIES,
  movie: movie
});



// TODO: User actions:
export const USER_REGISTER = 'USER_REGISTER';
export const userRegister = (name, email, password) => ({
  type: USER_REGISTER,
  name: name,
  email: email,
  password: password
});

export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = (email, password) => ({
  type: USER_LOGIN,
  email: email,
  password: password
});

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => ({
  type: USER_LOGOUT
});
