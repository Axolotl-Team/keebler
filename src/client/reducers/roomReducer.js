import * as types from '../constants/actionTypes';

const initialState = {
  roomId: null,
  roomname: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ROOM:
      return { ...state, roomId: action.payload.roomId, roomname: action.payload.roomname };
    default:
      return state;
  }
};

export default roomReducer;
