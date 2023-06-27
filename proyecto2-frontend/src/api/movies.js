import axiosInstance from './axiosInstance';

export const getMovies = () => {
    return dispatch => {
      dispatch({ type: 'FETCH_MOVIES_REQUEST' }); // Dispatch the FETCH_MOVIES_REQUEST action to set loading state
      
      axiosInstance.get('/movies').then(response => {
          dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: response.data }); // Dispatch the FETCH_MOVIES_SUCCESS action with the response data
        }).catch(error => {
          dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message }); // Dispatch the FETCH_MOVIES_FAILURE action with the error message
        });
    };
  };