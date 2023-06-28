import React, {useState, useEffect} from "react";
import moment from 'moment';
import { getUsers } from "../../api";
import showToast from "../../helpers/showToast";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';

import './MovieComments.scss'

const MovieComments = ({comments, onNewComment}) => {
    const AUTH = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [newCommentValue, setNewCommentValue] = useState('')

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
    


    return (
        <div className="movie-comments-container">
            <div className="comments-container">

                <h1>Comentarios</h1>
                { isUsersLoading ? <div>Cargando...</div> : comments?.map((comment) => {
                    return(
                        <div className={`comment-container ${(AUTH?.user.id === comment.user_uid) && 'created'}`}>
                            <div className="comment-user">
                                {users?.find((user) => user.id === comment?.user_uid)?.username}
                            </div>
                            <div className="comment-text">
                                {comment?.comment}
                            </div>
                            <div className="comment-date">
                                {comment?.published_on && moment(comment?.published_on).format('hh:mm DD/MM/YYYY')}
                            </div>
                        </div>
                    )
                })}
            </div>
            { !AUTH.user.is_admin &&
                <div className="create-comment-input">
                    <input 
                        type="text" 
                        placeholder="Escribe un comentario"
                        value={newCommentValue}
                        onChange={(e) => setNewCommentValue(e.target.value)}
                    />
                    <Button variant="outlined" onClick={() => {onNewComment(newCommentValue); setNewCommentValue('')}}>Comentar</Button>
                </div>
            }
        </div>
    );
}

export default MovieComments;