import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './reducers/loggedInReducer';
import authReducer from './reducers/authReducer';
import moviesReducer from './reducers/moviesReducer';

const store = configureStore({
  reducer: {
    loggedIn: loggedInReducer,
    auth: authReducer,
    movies: moviesReducer,
  },
});

export default store;
