import {useParams, useOutletContext, Navigate, Link} from 'react-router-dom';
import '../styles.css';

export default function MoviePanel() {
    const {id} = useParams();
    const {movies} = useOutletContext() ?? {};

    const movie = movies.find((m) => String(m.id) === String(id));
    if (!movie) return <Navigate to='/movies' replace />;

    return (
        <article className='movie-panel'>
            <h1>{movie.title}</h1>

            <img src={`/images/${movie.image}`} alt={movie.title} />

            <p>
                <strong>Year:</strong> {movie.year}
            </p>
            <p>
                <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
                <strong>Rating:</strong> {movie.rating}
            </p>
            <p>
                <strong>Release year:</strong> {movie.year}
            </p>
            <p>
                <strong>Movie duration:</strong> {movie.duration} min
            </p>
            <p>
                <strong>Age Rating:</strong> {movie.age_rating}
            </p>
            <p>{movie.description}</p>

            <Link className='movie-card-title' to='/movies'>
                ← Back to list
            </Link>
        </article>
    );
}
