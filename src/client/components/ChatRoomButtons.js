import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ChatRoomButtons extends Component {
  constructor() {
    super();
    this.state = {
      redirect: '',
    };
  }

  handleCreateRoom = () => {
    this.setState({ redirect: '/chat/create' });
  };

  handleInviteUsers = () => {
    this.setState({ redirect: '/chat/invite' });
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <div className="chat-room-buttons">
        <button
          className="chat-room-buttons__invite"
          type="button"
          onClick={this.handleInviteUsers}
        >
          Invite
        </button>
        <button className="chat-room-buttons__create" type="button" onClick={this.handleCreateRoom}>
          Create
        </button>
      </div>
    );
  }
}

export default ChatRoomButtons;
