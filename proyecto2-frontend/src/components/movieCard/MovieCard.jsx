import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { deleteMovie } from '../../api';
import { useDispatch } from 'react-redux';
import showToast from '../../helpers/showToast';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({key, movie}) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const AUTH = useSelector(state => state.auth);

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
        { !AUTH?.user?.is_admin && <Button size="small">Agregar a mi lista</Button> }
        <Button size="small">Ver</Button>
        { AUTH?.user?.is_admin && <Button size="small" onClick={() => onEditMovie()}>Editar</Button> }
        { AUTH?.user?.is_admin && <Button size="small" onClick={() => onDeleteMovie()}>Eliminar</Button> }
      </CardActions>
    </Card>
  );
}