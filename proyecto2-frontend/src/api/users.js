import axiosInstance from './axiosInstance';
import { loginUserSuccess, loginUserFailure } from '../store/actions/authActions';

export const createUser = (data) => {
    return axiosInstance.post('/users/create', data);
};

export const loginUser = (username, password) => dispatch => {
  dispatch({ type: 'LOGIN' }); // Dispatch the LOGIN action to set login status to true
  return axiosInstance
    .get(`/users/login?username=${username}&password=${password}`)
    .then(response => {
      // Dispatch the loginUserSuccess action with the response data
      dispatch(loginUserSuccess(response.data));
      // Dispatch an action to store the response in the auth reducer
      dispatch({
        type: 'SET_AUTH',
        payload: response.data, // Update the auth state with the response data
      });
      return response.data;
    }).catch(error => {
      // Dispatch the loginUserFailure action with the error message
      dispatch(loginUserFailure(error.message));
      throw new Error(error.message);
    });
};

export const logoutUser = (token) => (dispatch) => {
  return axiosInstance.post(`/users/logout?token=${token}`).then(() => {
      dispatch({ type: 'LOGOUT' }); // Dispatch the LOGOUT action to set login status to false
      dispatch({ type: 'SET_AUTH', payload: null }); // Clear the auth state by setting it to null
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
};

export const recoverPassword = (username) => {
  return axiosInstance.put(`/users/recover-password?username=${username}`);
}
  
export const getUsers = () => {
  return axiosInstance.get('/users');
}

export const deleteUser = (id) => {
  return axiosInstance.delete(`/users/delete/${id}`);
}

export const editUser = (id, data) => {
  return axiosInstance.put(`/users/update/${id}`, data);
}