import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Avatar, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import showToast from '../../helpers/showToast';
import { createMovie, updateMovie } from '../../api';
import { useDispatch, useSelector} from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

const CreateMovieForm = () => {
    const MOVIES = useSelector(state => state.movies);
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        src: '',
        preview: '',
        genre: '',
        MDA: '',
        year: '',
        duration: '',
    });

    useEffect(() => {
        if (location.pathname.startsWith('/edit-movie/')) {
            setIsEditing(true);
            console.log(id, 'id');
            const movies = MOVIES?.movies;
            const movie = movies?.find((movie) => movie.id === id);
            if (movie) {
                setFormData({
                name: movie.name,
                description: movie.description,
                src: movie.src,
                preview: movie.preview,
                genre: movie.genre,
                MDA: movie.MDA,
                year: movie.year,
                duration: movie.duration,
                });
            };
        };
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate inputs
        for (const key in formData) {
        if (formData[key].trim() === '') {
            showToast('error', 'Todos los campos son obligatorios');
            return;
        }
        }
        if(isEditing) {
            // Update movie
            console.log('formData', formData)
            dispatch(updateMovie(id, formData)).then(() => {
                showToast('success', 'Película actualizada correctamente');
            }).catch((error) => {
                showToast('error', 'Error al actualizar la película');
            }); 
        } else {
            // Create movie
            dispatch(createMovie(formData)).then(() => {
                showToast('success', 'Película creada correctamente');
                setFormData({
                    name: '',
                    description: '',
                    src: '',
                    preview: '',
                    genre: '',
                    MDA: '',
                    year: '',
                    duration: '',
                });
            }).catch((error) => {
            showToast('error', 'Error al crear la película');
            });
        }

    };

    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            {isEditing ? 'Editar Película' : 'Crear Película'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={formData.name}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="src"
                    label="URL"
                    name="src"
                    autoComplete="src"
                    value={formData.src}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="description"
                    label="Descripción"
                    name="description"
                    autoComplete="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="preview"
                    label="Vista Previa"
                    name="preview"
                    autoComplete="preview"
                    value={formData.preview}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="genre"
                    label="Género"
                    name="genre"
                    autoComplete="genre"
                    value={formData.genre}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="MDA"
                    label="MDA"
                    name="MDA"
                    autoComplete="MDA"
                    value={formData.MDA}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="year"
                    label="Año"
                    name="year"
                    autoComplete="year"
                    value={formData.year}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    id="duration"
                    label="Duración"
                    name="duration"
                    autoComplete="duration"
                    value={formData.duration}
                    onChange={handleChange}
                />
                </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {isEditing ? 'Editar Película' : 'Crear Película'}
            </Button>
            </Box>
        </Box>
        </Container>
    );
};

export default CreateMovieForm;
