const initialState = {
    userMoviesPlaylist: [],
    loading: false,
    error: null
  };
  
  const userMoviesPlaylistReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_MOVIES_PLAYLIST_REQUEST':
        return {
          ...state,
          loading: true,
          error: null
        };
      case 'FETCH_USER_MOVIES_PLAYLIST_SUCCESS':
        return {
          ...state,
          userMoviesPlaylist: action.payload,
          loading: false,
          error: null
        };
      case 'FETCH_USER_MOVIES_PLAYLIST_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case 'ADD_USER_MOVIE_PLAYLIST':
        return {
          ...state,
          userMoviesPlaylist: [...state.userMoviesPlaylist, action.payload],
          loading: false,
          error: null
        };
      case 'REMOVE_USER_MOVIE_PLAYLIST':
        return {
          ...state,
          userMoviesPlaylist: state.userMoviesPlaylist.filter(
            userMovie => userMovie.movie_uid !== action.payload
          ),
          loading: false,
          error: null
        };
      default:
        return state;
    }
  };
  
  export default userMoviesPlaylistReducer;
  