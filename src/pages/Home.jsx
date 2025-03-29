import MovieCard from "../components/MovieCard";
import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { debounce } from "lodash";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } catch (err) {
            console.log(err);
            setError("Failed to load Movies");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            setError("Failed to search Movie");
        } finally {
            setLoading(false);
        }
    };

    const fetchMovies = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                loadPopularMovies();
                return;
            }
            try {
                const searchResults = await searchMovies(query);
                setMovies(searchResults);
            } catch (err) {
                console.log("Failed to fetch movies");
            }
        }, 300),
        []
    );

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchMovies(query);
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    SEARCH
                </button>
            </form>

            {error && <div className="error-message"> {error} </div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;

















