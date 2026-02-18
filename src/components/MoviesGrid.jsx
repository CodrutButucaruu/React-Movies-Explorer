import React from 'react';
import {useOutletContext, useSearchParams, Link} from 'react-router-dom';
import '../styles.css';
import MovieCard from './MovieCard';
import Modal from './Modal';

export default function MoviesGrid() {
    const {movies, watchlist, toggleWatchlist} = useOutletContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get('search') ?? '';
    const genre = searchParams.get('genre') ?? 'All Genres';
    const rating = searchParams.get('rating') ?? 'All Ratings';

    const [selectedMovie, setSelectedMovie] = React.useState(null);
    const [isModalOpen, setModalOpen] = React.useState(false);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    };

    const handleSearchChange = (e) => {
        const v = e.target.value;
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (v) next.set('search', v);
            else next.delete('search');
            return next;
        });
    };

    const handleGenreChange = (e) => {
        const v = e.target.value;
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (v && v !== 'All Genres') next.set('genre', v);
            else next.delete('genre');
            return next;
        });
    };

    const handleRatingChange = (e) => {
        const v = e.target.value;
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (v && v !== 'All Ratings') next.set('rating', v);
            else next.delete('rating');
            return next;
        });
    };

    const matchesSearch = (movie, term) =>
        movie.title.toLowerCase().includes(term.toLowerCase());

    const matchesGenre = (movie, g) =>
        g === 'All Genres' || movie.genre.toLowerCase() === g.toLowerCase();

    const matchesRating = (movie, r) => {
        switch (r) {
            case 'Good':
                return movie.rating >= 8;
            case 'Ok':
                return movie.rating >= 5 && movie.rating < 8;
            case 'Bad':
                return movie.rating < 5;
            case 'All Ratings':
            default:
                return true;
        }
    };

    const filteredMovies = movies.filter(
        (m) =>
            matchesGenre(m, genre) &&
            matchesRating(m, rating) &&
            matchesSearch(m, search),
    );

    return (
        <div>
            <input
                type='text'
                className='search-input'
                placeholder='Search movies...'
                value={search}
                onChange={handleSearchChange}
            />

            <div className='filter-bar'>
                <div className='filter-slot'>
                    <label>Genre</label>
                    <select
                        className='filter-dropdown'
                        value={genre}
                        onChange={handleGenreChange}
                    >
                        <option>All Genres</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                    </select>
                </div>

                <div className='filter-slot'>
                    <label>Rating</label>
                    <select
                        className='filter-dropdown'
                        value={rating}
                        onChange={handleRatingChange}
                    >
                        <option>All Ratings</option>
                        <option>Good</option>
                        <option>Ok</option>
                        <option>Bad</option>
                    </select>
                </div>
            </div>

            <div className='movies-grid'>
                {filteredMovies.map((movie) => (
                    <div key={movie.id}>
                        <MovieCard
                            movie={movie}
                            toggleWatchlist={toggleWatchlist}
                            isWatchlisted={watchlist.includes(movie.id)}
                            onClick={() => openModal(movie)}
                            children={
                                <Link
                                    className='movie-card-title'
                                    to={`/movies/${movie.id}`}
                                >
                                    View All Details
                                </Link>
                            }
                        />
                    </div>
                ))}
            </div>

            <Modal open={isModalOpen} onClose={closeModal}>
                {selectedMovie && (
                    <div>
                        <img
                            className='modal-content img'
                            src={`/images/${selectedMovie.image}`}
                            alt={selectedMovie.title}
                        />
                        <h2>{selectedMovie.title}</h2>
                        <p className='modal-content-info'>
                            <strong>Year:</strong> {selectedMovie.year}
                        </p>
                        <p className='modal-content-info'>
                            <strong>Duration:</strong> {selectedMovie.duration}{' '}
                            <strong>min</strong>
                        </p>
                        <p className='modal-content-info'>
                            <strong>Age-Rating:</strong>{' '}
                            {selectedMovie.age_rating}
                        </p>
                        <p className='modal-content-info'>
                            <strong>Description:</strong>{' '}
                            {selectedMovie.description}
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
