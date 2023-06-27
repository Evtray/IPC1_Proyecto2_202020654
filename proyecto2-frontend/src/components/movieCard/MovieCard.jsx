import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export default function MovieCard({key, movie}) {
  const AUTH = useSelector(state => state.auth);
  
  useEffect(() => {
    console.log('first', movie)
  }, [])
  

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
        { AUTH?.user?.is_admin && <Button size="small">Editar</Button> }
        { AUTH?.user?.is_admin && <Button size="small">Eliminar</Button> }
      </CardActions>
    </Card>
  );
}
