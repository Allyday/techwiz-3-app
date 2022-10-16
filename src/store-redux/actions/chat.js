import { SET_CONVERSATIONS, REMOVE_CONVERSATIONS } from '../constant';

export const setConversations = (payload) => ({
  type: SET_CONVERSATIONS,
  payload,
});

export const removeConversations = () => ({ type: REMOVE_CONVERSATIONS });
