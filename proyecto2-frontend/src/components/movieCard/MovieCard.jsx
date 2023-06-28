import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { deleteMovie, addUserMovieToPlaylist, removeUserMovieFromPlaylist } from '../../api';
import { useDispatch } from 'react-redux';
import showToast from '../../helpers/showToast';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({key, movie}) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const AUTH = useSelector(state => state.auth);
  const USER_PLAYLIST = useSelector(state => state.userMoviesPlaylist);

  const onDeleteMovie = () => {
    console.log('delete', movie)
    dispatch(deleteMovie(movie.id)).then(() => {
      console.log('deleted')
      showToast('success', 'Película eliminada correctamente')
    }).catch((error) => {
      console.log('error')
      showToast('error', 'Error al eliminar la película')
    });
  }

  const onEditMovie = () => {
    navigate(`/edit-movie/${movie.id}`);
  }

  const onViewMovie = () => {
    navigate(`/movie/${movie.id}`);
  }

  const isInPlaylist = () => {
    return USER_PLAYLIST.userMoviesPlaylist.some((item) => item.movie_uid === movie.id);
  };

  const onAddToPlaylist = () => {
    let newMovie = {
      movie_uid: movie.id,
      user_uid: AUTH.user.id
    }
    dispatch(addUserMovieToPlaylist(newMovie)).then(() => {
      showToast('success', 'Película agregada correctamente')
    }).catch((error) => {
      console.log('error', error)
      showToast('error', 'Error al agregar la película')
    });
  };

  const onRemoveFromPlaylist = () => {
    dispatch(removeUserMovieFromPlaylist(movie.id, AUTH.user.id)).then(() => {
      showToast('success', 'Película eliminada de tu playlist correctamente')
    }).catch((error) => {
      console.log('error', error)
      showToast('error', 'Error al eliminar la película de tu playlist')
    });
  };


  return (
    <Card sx={{ maxWidth: 345 }} >
      <CardMedia
        sx={{ height: 140 }}
        image={movie.preview}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" title={movie.description}>
          {movie.description}
        </Typography>
      </CardContent>
      <CardActions>
        {
          !AUTH?.user?.is_admin && 
          (isInPlaylist(movie.id) ? 
            <Button size="small" onClick={() => onRemoveFromPlaylist()}  color="error">Eliminar de mi playlist</Button> : 
            <Button size="small" onClick={() => onAddToPlaylist()}>Agregar a mi playlist</Button>
          )
        }
        <Button size="small" onClick={() => onViewMovie()}>Ver</Button>
        { AUTH?.user?.is_admin && <Button size="small" onClick={() => onEditMovie()}>Editar</Button> }
        { AUTH?.user?.is_admin && <Button size="small" onClick={() => onDeleteMovie()}>Eliminar</Button> }
      </CardActions>
    </Card>
  );
}
