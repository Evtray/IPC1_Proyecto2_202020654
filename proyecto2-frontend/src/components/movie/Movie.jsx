import React, {useEffect, useState} from 'react';
import YouTube from 'react-youtube';
import MovieComments from '../movieComments/MovieComments';
import { useSelector, useDispatch } from 'react-redux';
import { publishComment } from '../../api';
import './Movie.scss'
import showToast from '../../helpers/showToast';


const Movie = ({ movie }) => {
    const AUTH = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [videoId, setVideoId] = useState(null);
    useEffect(() => {
      console.log(movie, 'movie component')
        if(movie?.src) {
            const videoId = extractYouTubeVideoId(movie?.src);
            setVideoId(videoId)
        }
    }, [movie])

    const opts = {
        height: '500',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    function extractYouTubeVideoId(url) {
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?.*v=|v\/)|youtu\.be\/)([\w-]{11})(?:\S+)?$/;
        const match = url.match(pattern);
        return match ? match[1] : null;
    }

    function makeAComment(comment) {
        let newComment = {
            user_uid: AUTH?.user?.id,
            movie_uid: movie?.id,
            comment: comment
        }
        console.log(newComment, 'new comment')
        dispatch(publishComment(newComment)).then((response) => {
            showToast('success', 'Comentario publicado')
        }).catch((error) => {
            showToast('error', 'Error al publicar el comentario')
        });
    }


    const renderMovieInfo = () => {
        return(
            <div className="movie-info-container">
                <div className="movie-info-title">
                    {movie?.name}
                </div>
                <div className="movie-info-description">
                    {movie?.description}
                </div>
                <div className='movie-details'>
                    <div className="movie-info-genre">
                        {`Genero: ${movie?.genre}`}
                    </div>
                    <div className="movie-info-year">
                        {`Año: ${movie?.year}`}
                    </div>
                    <div className="movie-info-duration">
                        {`Duración: ${movie?.duration}`}
                    </div>
                    <div className="movie-info-rating">
                        {`Clasificación: ${movie?.MDA}`}
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className='movie-video-component-container'>
            <div className='video-container'>
                <YouTube videoId={videoId} opts={opts} />               
            </div>
            <div className='movie-interactions'>
                { renderMovieInfo() }
                <div className='movie-comments'>
                    <MovieComments comments={movie?.comments} onNewComment={(comment) => makeAComment(comment)}/>
                </div>
            </div>
        </div>
    );
};

export default Movie;
 