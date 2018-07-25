import React from 'react';

const ChatRoomList = (props) => {
  const { chatrooms } = props;
  const chatroomComps = chatrooms.map(chatroom => <ChatRoomItem {...chatroom} />);
  return <div className="chat-room-list">{chatroomComps}</div>;
};

export default ChatRoomList;
