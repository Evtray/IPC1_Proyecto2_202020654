const initialState = {
    movies: [],
    loading: false,
    error: null
};
  
const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
        return {
        ...state,
        loading: true,
        error: null
        };
    case 'FETCH_MOVIES_SUCCESS':
        return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null
        };
    case 'FETCH_MOVIES_FAILURE':
        return {
        ...state,
        loading: false,
        error: action.payload
        };
    case 'FETCH_MOVIES_UPDATE':
        return {
        ...state,
        movies: [...state.movies, action.payload]
        };
    default:
        return state;
    }
};
  
export default moviesReducer;
  