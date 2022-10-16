import {
  SET_CONVERSATIONS,
  REMOVE_CONVERSATIONS,
  SET_MESSAGES,
} from '../constant';

const initialState = { conversations: [], messages: [] };

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERSATIONS: {
      return { ...state, conversations: action.payload };
    }
    case REMOVE_CONVERSATIONS: {
      return { ...state, conversations: [] };
    }
    case SET_MESSAGES: {
      return { ...state, messages: action.payload };
    }
    default:
      return state;
  }
};

export default chatReducer;
