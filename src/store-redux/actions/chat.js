import {
  SET_CONVERSATIONS,
  REMOVE_CONVERSATIONS,
  SET_MESSAGES,
} from '../constant';

export const setConversations = (payload) => ({
  type: SET_CONVERSATIONS,
  payload,
});

export const removeConversations = () => ({ type: REMOVE_CONVERSATIONS });

export const setMessages = (payload) => ({
  type: SET_MESSAGES,
  payload,
});
