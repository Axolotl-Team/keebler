import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import * as actions from '../actions/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const { setUser, setRoom } = this.props;
      const { username, password } = this.state;
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password,
      });

      const user = {
        userId: response.data.id,
        username: response.data.username,
      };
      setUser(user);
      setRoom({
        roomId: 99999,
        roomname: 'Main',
      });
    } catch (error) {
      console.log(error);
    }
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

    if (this.props.userId && this.props.username) {
      return <Redirect to="/chat" />;
    }

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

const mapStateToProps = ({ user }) => ({
  userId: user.userId,
  username: user.username,
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    dispatch(actions.setUser(user));
  },
  setRoom: (room) => {
    dispatch(actions.setRoom(room));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
