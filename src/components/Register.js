import React from "react";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <div className="Register">
          <h1 className="center">Register</h1>
          <div className="form-wrapper">
            <form onSubmit={this.register}>
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
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="form-caption center">
            <small>
              Already have an account?{" "}
              <Link to="/login">Click here to login.</Link>
            </small>
          </div>
        </div>
      </div>
    );
  }
}
