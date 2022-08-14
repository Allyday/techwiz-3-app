import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getAsyncStorageFromRedux } from './actions/user';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(getAsyncStorageFromRedux());
export default store;
