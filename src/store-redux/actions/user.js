import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SAVE_USER,
  INIT_STATE_USER,
  REMOVE_USER,
  LOGIN_USER,
  SET_USER_DETAILS,
} from '../constant';

export const saveUser = (body) => {
  return {
    type: SAVE_USER,
    payload: body,
  };
};

export const loginUser = (body) => {
  return {
    type: LOGIN_USER,
    payload: body,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const setUserDetails = (payload) => ({
  type: SET_USER_DETAILS,
  payload,
});

const setInit = (result) => {
  return {
    type: INIT_STATE_USER,
    payload: result,
  };
};

export const getAsyncStorageFromRedux = () => {
  return (dispatch) => {
    AsyncStorage.getItem('user').then((result) => {
      dispatch(setInit(JSON.parse(result)));
    });
  };
};
