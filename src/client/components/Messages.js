import React, { Component } from 'react';

import Message from './Message';

const Messages = (props) => {
  const { messages } = props;
  const messageComps = messages.map(message => <Message message={message} />);
  return <div className="messages">{messageComps}</div>;
};

export default Messages;
