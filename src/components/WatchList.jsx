import React from 'react';
import {useOutletContext} from 'react-router-dom';
import '../styles.css';
import MovieCard from './MovieCard';

export default function Watchlist() {
    const {movies, watchlist, toggleWatchlist} = useOutletContext();

    if (watchlist.length === 0) {
        return <h1>Add a movie to your watchlist first!</h1>;
    }
    return (
        <div>
            <h1 className='title'>Your Watchlist</h1>
            <div className='watchlist'>
                {watchlist.map((id) => {
                    const movie = movies.find((movie) => movie.id === id);
                    return (
                        <MovieCard
                            key={id}
                            movie={movie}
                            toggleWatchlist={toggleWatchlist}
                            isWatchlisted={true}
                        ></MovieCard>
                    );
                })}
            </div>
        </div>
    );
}
