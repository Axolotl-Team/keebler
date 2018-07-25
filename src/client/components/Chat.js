import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Messages from './Messages';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      input: '',
      messages: [],
    };
  }

  componentDidMount() {
    this.initConnection();
  }

  // async getMessages() {
  //  await fetch('http://localhost:8080/api/')
  // }

  initConnection = () => {
    const socket = io.connect('http://localhost:8080');
    socket.on('message', (message) => {
      console.log(message);
    });
    this.setState({ socket });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { input, socket } = this.state;
    const {
      roomId, roomname, userId, username,
    } = this.props;

    socket.emit('message', {
      message: input,
      roomId,
      roomname,
      userId,
      username,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    const { input } = this.state;

    return (
      <div className="chat">
        <Messages />
        <form onSubmit={this.handleOnSubmit} className="chat-form">
          <input
            type="text"
            value={input}
            onChange={this.handleInputChange}
            className="chat-form__input"
          />
          <input type="submit" value="Send" className="chat-form__button" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user, room }) => ({
  userId: user.userId,
  username: user.username,
  roomId: room.roomId,
  roomname: room.roomname,
});

export default connect(mapStateToProps)(Chat);
