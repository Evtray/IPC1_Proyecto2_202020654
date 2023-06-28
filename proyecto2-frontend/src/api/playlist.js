import axiosInstance from './axiosInstance';

export const getUserMoviesPlaylist = (userId) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER_MOVIES_PLAYLIST_REQUEST' }); // Dispatch the FETCH_USER_MOVIES_PLAYLIST_REQUEST action to set loading state
    
    return new Promise((resolve, reject) => {
      axiosInstance.get(`/userMoviesPlaylist?user_id=${userId}`)
        .then((response) => {
          dispatch({ type: 'FETCH_USER_MOVIES_PLAYLIST_SUCCESS', payload: response.data }); // Dispatch the FETCH_USER_MOVIES_PLAYLIST_SUCCESS action with the response data
          resolve(response.data); // Resolve the promise with the response data
        })
        .catch((error) => {
          dispatch({ type: 'FETCH_USER_MOVIES_PLAYLIST_FAILURE', payload: error.message }); // Dispatch the FETCH_USER_MOVIES_PLAYLIST_FAILURE action with the error message
          reject(error); // Reject the promise with the error
        });
    });
  };
};

  
export const addUserMovieToPlaylist = (userMovie) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('/userMoviesPlaylist', userMovie)
        .then((response) => {
          dispatch({ type: 'ADD_USER_MOVIE_PLAYLIST', payload: response.data });
          resolve(); // Resolve the promise after dispatching the action
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error
        });
    });
  };
};

  
export const removeUserMovieFromPlaylist = (movie_uid, user_uid) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(`/userMoviesPlaylist?user_uid=${user_uid}&movie_uid=${movie_uid}`)
        .then(() => {
          dispatch({ type: 'REMOVE_USER_MOVIE_PLAYLIST', payload: movie_uid });
          resolve(); // Resolve the promise after dispatching the action
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error
        });
    });
  };
};
