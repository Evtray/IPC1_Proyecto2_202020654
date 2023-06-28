import React, {useState, useEffect} from "react";
import UsersTable from "../../components/usersTable/usersTable";
import Header from "../../components/header/Header";
import { getUsers, deleteUser } from "../../api";
import showToast from "../../helpers/showToast";

import './UsersTableView.scss'

const UsersTableView = () => {
    const [users, setUsers] = useState([]);
    const [isUsersLoading, setIsUsersLoading] = useState(true);

    useEffect(() => {
      getUsers().then((res) => {
        console.log(res.data, 'users');
        setUsers(res.data);
        setIsUsersLoading(false);
      }).catch((err) => {
        console.log(err);
        setIsUsersLoading(false);
        showToast('error', 'Error al cargar los usuarios')
      });
    }, [])

    function onDeleteUser(user) {
      deleteUser(user).then((res) => {
        setUsers(users.filter((u) => u.id !== user));
        showToast('success', 'Usuario eliminado exitosamente')
      }).catch((err) => {
        console.log(err);
        showToast('error', 'Error al eliminar el usuario')
      });
    }
    
    return(
        <div className="users-table-view-container">
            <Header title='Administrar usuarios'/>
            {
                isUsersLoading ? <p>Cargando...</p> : <UsersTable users={users} deleteUser={(user) => onDeleteUser(user)}/>
            }

        </div>
    );
}

export default UsersTableView;