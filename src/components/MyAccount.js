import React from 'react';

export default class MyAccount extends React.Component {
  render() {
    return (
      <div className="MyAccount">
        <h1 className="center">My Account</h1>
        <div className="form-wrapper">
          <form className="form">
            {/* Name */}
            <label className="form-label" htmlFor="account-name">Name</label>
            <input className="form-input" id="account-name" type="text" name="name" />
            {/* Email */}
            <label className="form-label" htmlFor="account-email">Email</label>
            <input className="form-input" id="account-email" type="email" name="email" />
            {/* Password (disabled) */}
            <label className="form-label" htmlFor="account-password">Password</label>
            <input className="form-input" id="account-password" type="password" name="password" disabled readOnly value="password" />
          </form>
        </div>
      </div>
    );
  }
}
