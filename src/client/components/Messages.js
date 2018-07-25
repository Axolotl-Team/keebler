import React, { Component } from 'react';

import Message from './Message';

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.getMessages();
  }

  async getMessages() {
    await fetch('http://localhost:8080/api/getMessages');
  }

  render() {
    const { messages } = this.state;
    const messageComps = messages.map(message => <Message message={message} />);
    return <div className="messages">{messageComps}</div>;
  }
}

export default Messages;
