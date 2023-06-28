import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux';


export default function UsersTable({users, deleteUser}) {
  const AUTH = useSelector(state => state.auth);
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">Nombre de Usuario</TableCell>
            <TableCell align="center">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            AUTH.user.id !== row.id &&
                <TableRow
                key={row.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.lastname}</TableCell>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center"><Button  variant="outlined" color="error" onClick={() => deleteUser(row.id)}>Eliminar</Button></TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
