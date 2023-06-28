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
        movies: mergeMovies(state.movies, action.payload), // Merge the existing movies with the fetched movies
        loading: false,
        error: null
      };
    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'FETCH_MOVIES_NEW':
      return {
        ...state,
        movies: [...state.movies, action.payload],
        loading: false,
        error: null
      };
    case 'FETCH_MOVIES_UPDATE':
      const updatedMovies = state.movies.map(movie => {
        if (movie.id === action.payload.id) {
          return action.payload;
        }
        return movie;
      });
      return {
        ...state,
        movies: updatedMovies,
        loading: false,
        error: null
      };
    case 'FETCH_MOVIES_DELETE':
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.payload),
        loading: false // Set loading to false after deleting the movie
      };
    case 'FETCH_MOVIES_COMMENT':
      const { user_uid, movie_uid, comment } = action.payload;
      const updatedMovieComments = state.movies.map(movie => {
        if (movie.id === movie_uid) {
          const updatedComments = [...movie.comments, {
            id: action.payload.id,
            user_uid,
            comment,
            published_on: action.payload.published_on
          }];
          return {
            ...movie,
            comments: updatedComments
          };
        }
        return movie;
      });
      return {
        ...state,
        movies: updatedMovieComments,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

// Helper function to merge movies and avoid duplicates based on movie ID
const mergeMovies = (existingMovies, newMovies) => {
  const existingIds = new Set(existingMovies.map(movie => movie.id));
  const filteredNewMovies = newMovies.filter(movie => !existingIds.has(movie.id));
  return [...existingMovies, ...filteredNewMovies];
};

export default moviesReducer;
