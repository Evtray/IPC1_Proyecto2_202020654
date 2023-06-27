const initialState = false;

const loggedInReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return true; // Set login status to true
      case 'LOGOUT':
        return false; // Set login status to false
      case 'LOGIN_SUCCESS':
        return true; // Set login status to true
      case 'LOGIN_FAILURE':
        return false; // Set login status to false
      default:
        return state; // Return current state for unrecognized actions
    }
};

export default loggedInReducer;