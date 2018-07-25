import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions/actions';

class CreateRoom extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      redirect: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleCreateRoom = async (e) => {
    try {
      e.preventDefault();

      const { userId, setRoom } = this.props;
      const { input } = this.state;

      const response = await axios.post('http://localhost:8080/api/rooms/', {
        userId,
        roomname: input,
      });

      const room = {
        roomId: response.data.id,
        roomname: response.data.name,
      };

      setRoom(room);
      this.setState({ redirect: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { input, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/chat" />;
    }

    return (
      <div className="create-room">
        <form className="create-room-form" onSubmit={this.handleCreateRoom}>
          <input
            type="text"
            value={input}
            onChange={this.handleInputChange}
            className="create-room-form__input"
          />
          <input type="submit" value="Create" className="create-room-form__button" />
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

const mapDispatchToProps = dispatch => ({
  setRoom: (room) => {
    dispatch(actions.setRoom(room));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateRoom);
