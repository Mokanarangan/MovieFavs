import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchMovies} from './actions';

// Views
import MovieGrid from './components/MovieGrid';
import MyMovies from './components/MyMovies';
import MyAccount from './components/MyAccount';
import Login from './components/Login';
import Register from './components/Register';

export class App extends React.Component {
  // Load movies on initial page load
  componentDidMount() {
    this.props.dispatch(fetchMovies());
  }

  render() {
    let content;

    // Get view based on current route
    switch (this.props.location.pathname) {
      case '/top-picks':
        // Sort movies by popularity
        this.props.movies.sort((a, b) => a.popularity < b.popularity);
        content = (<MovieGrid {...this.props} />);
        break;
      case '/my-movies':
        content = (<MyMovies {...this.props} />);
        break;
      case '/my-account':
        content = (<MyAccount {...this.props} />);
        break;
      case '/login':
        content = (<Login {...this.props} />);
        break;
      case '/register':
        content = (<Register {...this.props} />);
        break;
      default:
        // Sort movies by release date
        this.props.movies.sort((a, b) => a.release_date < b.release_date);
        content = (<MovieGrid {...this.props} />);
        break;
    }

    return (
      <div className="App">
        <header className="header">
          <div className="wrapper">
            <div className="header-login">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              /
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </div>
            <div className="logo-wrapper">
              <NavLink className="logo" to="/">
                <span className="logo-image">FlixUs</span>
              </NavLink>
            </div>
            <nav className="nav">
              <ul className="nav-list">
                <li className="nav-item"><NavLink to="/" exact className="nav-link">Just Released</NavLink></li>
                <li className="nav-item"><NavLink to="/top-picks" className="nav-link">Top Picks</NavLink></li>
                <li className="nav-item"><NavLink to="/my-movies" className="nav-link">My Movies</NavLink></li>
                <li className="nav-item"><NavLink to="/my-account" className="nav-link">My Account</NavLink></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          {content}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  featuredTop: state.featuredTop,
  featuredBottom: state.featuredBottom,
  movies: state.movies,
  myMovies: state.myMovies,
  loading: state.loading,
  error: state.error
});

export default withRouter(connect(mapStateToProps)(App));
