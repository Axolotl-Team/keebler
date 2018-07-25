import React from 'react';

import Message from './Message';

const Messages = (props) => {
  const { messages } = props;
  const messageComps = messages.map((message, index) => <Message key={index} {...message} />);
  return <div className="messages">{messageComps}</div>;
};

export default Messages;
