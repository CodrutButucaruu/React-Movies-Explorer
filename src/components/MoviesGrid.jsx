import React, {useState} from 'react';
import '../styles.css';
import MovieCard from './MovieCard';
import Modal from './Modal';

export default function MoviesGrid({movies, watchlist, toggleWatchlist}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('All Genres');
    const [rating, setRating] = useState('All Ratings');

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const matchesRating = (movie, rating) => {
        switch (rating) {
            case 'All Ratings':
                return true;
            case 'Good':
                return movie.rating >= 8;

            case 'Ok':
                return movie.rating >= 5 && movie.rating < 8;

            case 'Bad':
                return movie.rating < 5;

            default:
                return false;
        }
    };

    const matchesSearchTerm = (movie, searchTerm) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const matchesGenre = (movie, genre) => {
        return (
            genre === 'All Genres' ||
            movie.genre.toLowerCase() === genre.toLowerCase()
        );
    };

    const filteredMovies = movies.filter(
        (movie) =>
            matchesGenre(movie, genre) &&
            matchesRating(movie, rating) &&
            matchesSearchTerm(movie, searchTerm),
    );

    return (
        <div>
            <input
                type='text'
                className='search-input'
                placeholder='Search movies...'
                value={searchTerm}
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
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                        toggleWatchlist={toggleWatchlist}
                        isWatchlisted={watchlist.includes(movie.id)}
                        onClick={() => openModal(movie)}
                    ></MovieCard>
                ))}
            </div>

            <Modal open={isModalOpen} onClose={closeModal}>
                {selectedMovie && (
                    <div>
                        <img
                            className='modal-content img'
                            src={`images/${selectedMovie.image}`}
                            alt={selectedMovie.title}
                        ></img>

                        <h2>{selectedMovie.title}</h2>

                        <p className='modal-content-info'>
                            <strong>Year:</strong> {selectedMovie.year}
                        </p>
                        <p className='modal-content-info'>
                            <strong>Duration:</strong> {selectedMovie.duration}
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
