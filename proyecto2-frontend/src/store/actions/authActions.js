export const loginUserSuccess = (userData) => {
    return {
      type: 'LOGIN_SUCCESS',
      payload: userData,
    };
  };
  
  export const loginUserFailure = (errorMessage) => {
    return {
      type: 'LOGIN_FAILURE',
      payload: errorMessage,
    };
  };
  