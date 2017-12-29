import { put, takeLatest } from "redux-saga/effects";
import fetch from "cross-fetch";
import history from "../history";

// TMDB API key:
// https://www.themoviedb.org/settings/api
const API_KEY = "cc6d2c6b137405f0457b9bdb5863c4ef";

// Get TMBD's image settings:
// https://developers.themoviedb.org/3/getting-started/images
// https://developers.themoviedb.org/3/configuration/get-api-configuration
let _imageSettings;

function* userLogin(action) {
  const { email, password } = action;
  const loginData = {
    username: email,
    password: password
  };

  try {
    yield fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
      // Then wait for a successful response.
    }).then(
      function(response) {
        response.status; //=> number 100–599
        response.statusText; //=> String
        response.headers; //=> Headers
        response.url; //=> String

        // If it worked, redirect us to the home page, or something.
        console.log("it worked!", response);

        history.push("/");

        return response.text();
        // Or handle for errors?
      },
      function(error) {
        error.message; //=> String
      }
    );
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* fetchMovies() {
  yield put({ type: "REQUEST_MOVIES" });
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
      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      )
        .then(response => response.json())
        .then(json => {
          resolve(json.results);
        });
    });
  });
  // Return movies via action
  const result = yield getMovies.then(json => {
    // Add full image paths
    let movies = json.map(movie => {
      // 'w300', 'w780', 'w1280', 'original'
      movie.full_backdrop_path =
        _imageSettings.base_url + "w1280" + movie.backdrop_path;
      // 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'
      movie.full_poster_path =
        _imageSettings.base_url + "w154" + movie.poster_path;
      return movie;
    });
    // Feature the 2 most popular movies
    let featured = movies
      .sort((a, b) => a.popularity < b.popularity)
      .slice(0, 2);

    return {
      featuredTop: featured[0],
      featuredBottom: featured[1],
      movies: movies
    };
  });

  yield put({ type: "RECEIVE_MOVIES", ...result });
}

function* mySaga() {
  yield [
    takeLatest("USER_LOGIN", userLogin),
    takeLatest("FETCH_MOVIES", fetchMovies)
  ];
}

export default mySaga;
