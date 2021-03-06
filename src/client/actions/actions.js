import * as types from '../constants/actionTypes';

export const setUser = user => ({
  type: types.SET_USER,
  payload: user,
});

export const setRoom = room => ({
  type: types.SET_ROOM,
  payload: room,
});
