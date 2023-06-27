import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './reducers/loggedInReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    loggedIn: loggedInReducer,
    auth: authReducer,
  },
});

export default store;
