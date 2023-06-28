import axiosInstance from './axiosInstance';

export const getMovies = () => {
  console.log('getMovies');
    return dispatch => {
      dispatch({ type: 'FETCH_MOVIES_REQUEST' }); // Dispatch the FETCH_MOVIES_REQUEST action to set loading state
      
      axiosInstance.get('/movies').then(response => {
          dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: response.data }); // Dispatch the FETCH_MOVIES_SUCCESS action with the response data
        }).catch(error => {
          dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message }); // Dispatch the FETCH_MOVIES_FAILURE action with the error message
        });
    };
};

export const createMovie = (formData) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_MOVIES_REQUEST' }); // Dispatch the FETCH_MOVIES_REQUEST action to set loading state
    
    return axiosInstance
      .post('/movies/create', formData)
      .then((response) => {
        dispatch({ type: 'FETCH_MOVIES_NEW', payload: response.data }); // Dispatch the FETCH_MOVIES_NEW action with the response data
        dispatch({ type: 'FETCH_MOVIES_SUCCESS' }); // Dispatch the FETCH_MOVIES_SUCCESS action
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message }); // Dispatch the FETCH_MOVIES_FAILURE action with the error message
      });
  };
};

export const deleteMovie = (movieUid) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_MOVIES_REQUEST' }); // Dispatch the FETCH_MOVIES_REQUEST action to set loading state

    return axiosInstance
      .delete(`/movies/${movieUid}`)
      .then(() => {
        dispatch({ type: 'FETCH_MOVIES_DELETE', payload: movieUid }); // Dispatch the FETCH_MOVIES_DELETE action with the movie ID
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message }); // Dispatch the FETCH_MOVIES_FAILURE action with the error message
      });
  };
};

export const updateMovie = (movieId, formData) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_MOVIES_REQUEST' }); // Dispatch the FETCH_MOVIES_REQUEST action to set loading state
    
    return axiosInstance
      .put(`/movies/update/${movieId}`, formData).then((response) => {
        dispatch({ type: 'FETCH_MOVIES_UPDATE', payload: response.data }); // Dispatch the FETCH_MOVIES_UPDATE action with the response data
        dispatch({ type: 'FETCH_MOVIES_SUCCESS' }); // Dispatch the FETCH_MOVIES_SUCCESS action
      }).catch((error) => {
        dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message }); // Dispatch the FETCH_MOVIES_FAILURE action with the error message
      });
  };
};

export const publishComment = (data) => {
  return (dispatch) => {
    return axiosInstance.post('/comments/create', data).then((response) => {
      dispatch({ type: 'FETCH_MOVIES_COMMENT', payload: response.data }); // Dispatch the FETCH_MOVIES_COMMENT action with the response data
    }).catch((error) => {
    });
  };
}