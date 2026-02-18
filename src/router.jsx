import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import MoviesGrid from './components/MoviesGrid';
import Watchlist from './components/WatchList';
import MoviePanel from './components/MoviePanel';
import NotFound from './components/NotFound';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <MoviesGrid />,
            },
            {
                path: 'movies',
                element: <MoviesGrid />,
            },
            {
                path: 'watchlist',
                element: <Watchlist />,
            },
            {
                path: 'movies/:id',
                element: <MoviePanel />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
