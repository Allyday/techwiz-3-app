import {
  INIT_STATE_USER,
  SAVE_USER,
  REMOVE_USER,
  LOGIN_USER,
  SET_USER_DETAILS,
} from '../constant';

const initialState = {
  user: {},
  details: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SAVE_USER:
      const newUser = { ...state.user };
      newUser.first_name = action.payload.first_name;
      newUser.last_name = action.payload.last_name;
      newUser.address = action.payload.address;
      newUser.phone = action.payload.phone;
      newUser.date_of_birth = action.payload.date_of_birth;
      return { ...state, user: newUser };

    case LOGIN_USER:
      return { ...state, user: action.payload };

    case REMOVE_USER:
      return { ...state, user: {}, details: [] };

    case SET_USER_DETAILS:
      return { ...state, details: action.payload };

    default:
      return state;
  }
};

export default userReducer;
