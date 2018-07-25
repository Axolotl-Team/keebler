
import * as types from '../constants/actionTypes';

const initialState = {
  userId: null,
  username: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, userId: action.payload.userId, username: action.payload.username };
    default:
      return state;
  }
};

export default userReducer;
