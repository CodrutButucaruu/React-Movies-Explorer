import './App.css';
import './styles.css';
import {useState, useEffect} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        fetch('movies.json')
            .then((r) => r.json())
            .then((data) => setMovies(data));
    }, []);

    const toggleWatchlist = (movieId) => {
        setWatchlist((prev) =>
            prev.includes(movieId)
                ? prev.filter((id) => id !== movieId)
                : [...prev, movieId],
        );
    };

    return (
        <>
            <Header>
                <nav className='nav'>
                    <NavLink
                        to='/movies'
                        className={({isActive}) =>
                            'nav-link' + (isActive ? ' active' : '')
                        }
                    >
                        Movies
                    </NavLink>

                    <NavLink
                        to='/watchlist'
                        className={({isActive}) =>
                            'nav-link' + (isActive ? ' active' : '')
                        }
                    >
                        Watchlist
                    </NavLink>
                </nav>
            </Header>

            <main>
                <Outlet context={{movies, watchlist, toggleWatchlist}} />
            </main>

            <Footer />
        </>
    );
}
