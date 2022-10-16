import { combineReducers } from 'redux';

import chatReducer from './chat';
import userReducer from './user';

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
});

export default rootReducer;
