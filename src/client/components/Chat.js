import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

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
    // socket.on('message', );
    this.setState({ socket });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { input, socket } = this.state;
    socket.emit('message', input);
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

export default Chat;
