import { SET_CONVERSATIONS, REMOVE_CONVERSATIONS } from '../constant';

const initialState = { conversations: [] };

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERSATIONS: {
      return { ...state, conversations: action.payload };
    }
    case REMOVE_CONVERSATIONS: {
      return { ...state, conversations: [] };
    }
    default:
      return state;
  }
};

export default chatReducer;
