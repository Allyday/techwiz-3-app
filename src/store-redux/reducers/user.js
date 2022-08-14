// import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  INIT_STATE_USER,
  SAVE_USER,
  REMOVE_USER,
  LOGIN_USER,
} from '../constant';

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SAVE_USER: {
      const newUser = { ...state.user };
      newUser.first_name = action.payload.first_name;
      newUser.last_name = action.payload.last_name;
      newUser.address = action.payload.address;
      newUser.phone = action.payload.phone;
      newUser.date_of_birth = action.payload.date_of_birth;
      return { user: newUser };
    }

    case LOGIN_USER: {
      return { user: action.payload };
    }
    case REMOVE_USER: {
      return { user: {} };
    }

    default:
      return state;
  }
};

export default userReducer;
