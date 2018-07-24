import React, { Component } from 'react';

class Signup extends Component {
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
      <div className="signup">
        <form onSubmit={this.handleOnSubmit} className="signup-form">
          <label htmlFor="username" className="signup-form__username-label">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={this.handleUsernameChange}
            id="username"
            className="signup-form__username-input"
          />
          <label htmlFor="password" className="signup-form__password-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
            id="password"
            className="signup-form__password-input"
          />
          <input type="submit" value="Signup" className="signup-form__button" />
        </form>
      </div>
    );
  }
}

export default Signup;
