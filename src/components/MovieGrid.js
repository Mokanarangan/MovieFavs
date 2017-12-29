import React from 'react';
import Spinner from 'react-spinkit';
import {addToMyMovies} from '../actions';

export default class Home extends React.Component {
  addToMyMovies(event, movie) {
    event.preventDefault();
    this.props.dispatch(addToMyMovies(movie));
  }

  renderFeatured(movie) {
    return (
      <div className="featured">
        <div className="featured-image">
          <img src={movie.full_backdrop_path} alt="" />
        </div>
        <div className="featured-content">
          <h2 className="featured-title">
            {movie.title}
          </h2>
          <p className="featured-description">
            {movie.overview}
          </p>
          <button className="button" type="button"
            onClick={event => this.addToMyMovies(event, movie)}>
            Add to My Movies
          </button>
        </div>
      </div>
    );
  }

  renderGrid() {
    const movies = this.props.movies.map((movie, index) => (
      <li className="movie-grid-item" key={index}>
        <button className="movie" type="button" data-text="Add to My Movies"
          onClick={event => this.addToMyMovies(event, movie)}>
          <img className="movie-poster" src={movie.full_poster_path} alt={movie.title} />
        </button>
      </li>
    ));

    return <ul className="movie-grid">{movies}</ul>;
  }

  render(props) {
    // Loading
    if (this.props.loading) {
      return <div className="wrapper center"><Spinner spinnerName="circle" noFadeIn /></div>;
    }
    // Error
    if (this.props.error) {
      return <div className="wrapper center"><strong>{this.props.error}</strong></div>;
    }
    // Success
    return (
      <div className="MovieGrid">
        {this.renderFeatured(this.props.featuredTop)}
        <div className="wrapper">{this.renderGrid()}</div>
        {this.renderFeatured(this.props.featuredBottom)}
      </div>
    );
  }
}
