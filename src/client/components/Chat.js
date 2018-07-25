import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import ChatRoomButtons from './ChatRoomButtons';
import ChatRoomList from './ChatRoomList';
import Messages from './Messages';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      input: '',
      messages: [],
      rooms: [],
      hasGotMessage: false,
    };
  }

  async componentDidMount() {
    this.initConnection();
    this.getRooms();
  }

  getRooms = async () => {
    const { userId } = this.props;

    try {
      const response = await axios.get(`http://localhost:8080/api/users/${userId}/rooms`);
      this.setState({ rooms: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  getMessages = async () => {
    const { roomId } = this.props;

    try {
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
    const {
      input, messages, rooms, hasGotMessage,
    } = this.state;
    const { roomId } = this.props;
    console.log(rooms);

    if (roomId && !hasGotMessage) {
      this.setState({ hasGotMessage: true });
      this.getMessages();
      // this.getRooms();
    }

    return (
      <div className="chat">
        <ChatRoomButtons
          handleCreateRoom={this.handleCreateRoom}
          handleInviteToRoom={this.handleInviteToRoom}
        />
        {/* <ChatRoomList /> */}
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
