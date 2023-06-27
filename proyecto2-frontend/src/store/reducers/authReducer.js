const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        return action.payload;
      case 'LOGOUT':
        return {
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  