import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api';
import showToast from '../../helpers/showToast' 

const defaultTheme = createTheme();

const SignUp = ({isAdminCreating}) => {
  let navigate = useNavigate();
  function onLogin() {
    navigate('/login');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
    });
    let userParams = {
      username: data.get('username'),
      password: data.get('password'),
      name: data.get('firstName'),
      lastname: data.get('lastName'),
      is_admin: isAdminCreating ? true : false,
    }
    if(userParams.username === '' || userParams.password === '' || userParams.name === '' || userParams.lastname === '') {
      showToast('error', 'Todos los campos son obligatorios');
      return;
    }
    createUser(userParams).then((response) => {
      console.log(response);
      showToast('success', 'Usuario creado correctamente');
      isAdminCreating ? navigate('/users') : navigate('/login');
    }).catch((error) => {
      console.log(error);
      if(error?.response?.status === 400) {
        showToast('error', 'El nombre de usuario ya existe');
      } else {
        showToast('error', 'Error al crear usuario');
      }

    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            {isAdminCreating ? 'Crear Usuario' : 'Registrarse'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isAdminCreating ? 'Crear Usuario' : 'Registrarse'}
            </Button>
            {
              !isAdminCreating &&
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2" onClick={() => onLogin()}>
                    ¿Ya tienes una cuenta? Iniciar sesión
                  </Link>
                </Grid>
              </Grid>
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
