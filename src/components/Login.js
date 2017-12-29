import React from 'react';
import {Link} from 'react-router-dom';
import fetch from 'cross-fetch';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login(event) {
    event.preventDefault();

    // TODO: Get data from the form (i.e., my username and password)
    const loginData = {
      username: 'will',
      password: 'perez'
    };

    console.log('We’re trying to login!', loginData);
    const history = this.props.history;

    // TODO: Reduxify this… see `fetchMovies` as an example
    // (Technically, we should be dispatching an action—somewher in here—that saves the logged in user to the global state…
    fetch('/api/users/login', {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    // Then wait for a successful response.
    }).then(function(response) {
      response.status     //=> number 100–599
      response.statusText //=> String
      response.headers    //=> Headers
      response.url        //=> String

      // If it worked, redirect us to the home page, or something.
      console.log('it worked!', response);

      history.push('/');

      return response.text();
    // Or handle for errors?
    }, function(error) {
      error.message //=> String
    });
  }

  render() {
    return (
      <div className="Login">
        <h1 className="center">Login</h1>
        <div className="form-wrapper">
          <form onSubmit={this.login}>
            <div className="form">
              {/* Username */}
              <label className="form-label" htmlFor="account-username">Username</label>
              <input className="form-input" id="account-username" type="username" name="username" />
              {/* Password */}
              <label className="form-label" htmlFor="account-password">Password</label>
              <input className="form-input" id="account-password" type="password" name="password" />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="form-caption center">
          <small>Don’t have an account? <Link to="/register">Click here to register.</Link></small>
        </div>
      </div>
    );
  }
}
