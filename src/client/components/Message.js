import React from 'react';

const Message = ({ message, username, createdAt }) => (
  <div className="message">
    <p className="message__header">
      <span className="message__username">{username}</span>
      <span className="message__createdAt">{createdAt}</span>
    </p>
    <p className="message__content">{message}</p>
  </div>
);

export default Message;
