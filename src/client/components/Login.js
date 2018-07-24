import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
  };

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login">
        <form onSubmit={this.handleOnSubmit} className="login-form">
          <label htmlFor="username" className="login-form__username-label">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={this.handleUsernameChange}
            id="username"
            className="login-form__username-input"
          />
          <label htmlFor="password" className="login-form__password-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
            id="password"
            className="login-form__password-input"
          />
          <input type="submit" value="Login" className="login-form__button" />
        </form>
      </div>
    );
  }
}

export default Login;
