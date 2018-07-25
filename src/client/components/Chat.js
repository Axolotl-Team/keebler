import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import ChatRoomButtons from './ChatRoomButtons';
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

  async componentDidMount() {
    this.initConnection();
  }

  getMessages = async () => {
    try {
      const { roomId } = this.props;

      const response = await axios.get(`http://localhost:8080/api/rooms/${roomId}/messages`);
      this.setState({ messages: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  initConnection = () => {
    const socket = io.connect('http://localhost:8080');
    socket.on('message', (message) => {
      this.setState((prevState) => {
        const newMessages = prevState.messages.concat([message]);

        return {
          ...prevState,
          messages: newMessages,
        };
      });
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
    const { input, messages } = this.state;
    const { roomId } = this.props;

    if (roomId) {
      this.getMessages();
    }

    return (
      <div className="chat">
        <ChatRoomButtons
          handleCreateRoom={this.handleCreateRoom}
          handleInviteToRoom={this.handleInviteToRoom}
        />
        <Messages messages={messages} />
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
