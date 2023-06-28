import { configureStore } from '@reduxjs/toolkit';
import loggedInReducer from './reducers/loggedInReducer';
import authReducer from './reducers/authReducer';
import moviesReducer from './reducers/moviesReducer';
import userMoviesPlaylistReducer from './reducers/userMoviesPlaylistReducer';

const store = configureStore({
  reducer: {
    loggedIn: loggedInReducer,
    auth: authReducer,
    movies: moviesReducer,
    userMoviesPlaylist: userMoviesPlaylistReducer,
  },
});

export default store;
