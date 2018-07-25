import React from 'react';

const ChatRoomButtons = (props) => {
  const { handleInviteUsers, handleCreateRoom } = props;

  return (
    <div className="chat-room-buttons">
      <button className="chat-room-buttons__invite" type="button" onClick={handleInviteUsers}>
        Invite
      </button>
      <button className="chat-room-buttons__create" type="button" onClick={handleCreateRoom}>
        Create
      </button>
    </div>
  );
};

export default ChatRoomButtons;
