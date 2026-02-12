import './App.css';
import './styles.css';
import {useState, useEffect} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesGrid from './components/MoviesGrid';
import Watchlist from './components/WatchList';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

function App() {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    useEffect(() => {
        fetch('movies.json')
            .then((response) => response.json())
            .then((data) => setMovies(data));
    }, []);

    const toggleWatchlist = (movieId) => {
        setWatchlist((prev) =>
            prev.includes(movieId)
                ? prev.filter((id) => id !== movieId)
                : [...prev, movieId],
        );
    };

    if (loading) {
        return <h2>Loading the movies ...</h2>;
    }

    return (
        <div className='App'>
            <div className='container'>
                <Header></Header>
                <Router>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                                <Link to='/watchlist'>Watchlist</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <MoviesGrid
                                    movies={movies}
                                    watchlist={watchlist}
                                    toggleWatchlist={toggleWatchlist}
                                ></MoviesGrid>
                            }
                        ></Route>
                        <Route
                            path='/watchlist'
                            element={
                                <Watchlist
                                    watchlist={watchlist}
                                    movies={movies}
                                    toggleWatchlist={toggleWatchlist}
                                ></Watchlist>
                            }
                        ></Route>
                    </Routes>
                </Router>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;
