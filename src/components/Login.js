import React from "react";
import { Link } from "react-router-dom";
import fetch from "cross-fetch";
import { userLogin } from "../actions";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
  }

  handleUserNameChange(e) {
    this.setState({
      userName: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    const { userName, password } = this.state;
    const { dispatch } = this.props;
    return (
      <div className="Login">
        <h1 className="center">Login</h1>
        <div className="form-wrapper">
          <div className="form">
            {/* Username */}
            <label className="form-label" htmlFor="account-username">
              Username
            </label>
            <input
              className="form-input"
              id="account-username"
              type="username"
              name="username"
              onChange={this.handleUserNameChange}
              value={userName}
            />
            {/* Password */}
            <label className="form-label" htmlFor="account-password">
              Password
            </label>
            <input
              className="form-input"
              id="account-password"
              type="password"
              name="password"
              onChange={this.handlePasswordChange}
              password={password}
            />
          </div>
          <button
            type="submit"
            onClick={() => dispatch(userLogin(userName, password))}
          >
            Submit
          </button>
        </div>
        <div className="form-caption center">
          <small>
            Don’t have an account?{" "}
            <Link to="/register">Click here to register.</Link>
          </small>
        </div>
      </div>
    );
  }
}
