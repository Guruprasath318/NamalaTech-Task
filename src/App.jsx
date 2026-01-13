import { useCallback, useState } from 'react';
import Loader from './components/Loader';
import MovieList from './components/MovieList';
import { useMovies } from './hooks/useMovies';
import './styles/App.css';
import { COLLECTION_CATEGORIES, COLLECTION_POOL } from './utils/constants';

function App() {
    const [collectionKey, setCollectionKey] = useState('ALL'); // Default to ALL for impact
    const [tempId, setTempId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isHeaderHidden, setIsHeaderHidden] = useState(false);
    const [selectedYear, setSelectedYear] = useState('All Years');

    // Determine if we fetch a single ID or the entire pool
    const idToFetch = collectionKey === 'ALL' ? COLLECTION_POOL : collectionKey;
    const { movies, collectionInfo, loading, error } = useMovies(idToFetch);

    const handleScroll = useCallback(({ scrollOffset, scrollDirection }) => {
        if (scrollDirection === 'forward' && scrollOffset > 100) {
            setIsHeaderHidden(true);
        }
    }, []);

    const toggleHeader = () => setIsHeaderHidden(!isHeaderHidden);

    // Derived data for filters
    const availableYears = Array.from(new Set(movies
        .map(m => m.release_date ? m.release_date.split('-')[0] : null)
        .filter(Boolean)
    )).sort((a, b) => b - a);

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === 'All Years' || (movie.release_date && movie.release_date.startsWith(selectedYear));
        return matchesSearch && matchesYear;
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (tempId.trim()) {
            setCollectionKey(tempId);
        }
    };

    const handleCategoryClick = (id) => {
        setCollectionKey(id);
        setTempId(id);
    };

    const handleRandomize = useCallback(() => {
        const randomId = COLLECTION_POOL[Math.floor(Math.random() * COLLECTION_POOL.length)];
        setCollectionKey(randomId);
        setTempId(randomId);
    }, []);

    return (
        <div className={`app-container ${isHeaderHidden ? 'header-hidden' : ''}`}>
            <button
                className={`back-menu-btn ${isHeaderHidden ? 'visible' : ''}`}
                onClick={toggleHeader}
                aria-label="Show Header"
            >
                <span className="back-icon">☰</span>
                <span className="back-text">Menu</span>
            </button>

            <header className={isHeaderHidden ? 'collapsed' : ''}>
                <div className="header-top">
                    <div className="brand-section">
                        <h1 className="main-title">Movie Explorer</h1>
                        <p className="collection-status">
                            {loading ? 'Recycling Views...' : (collectionInfo?.name || 'Exploring...')}
                        </p>
                    </div>

                    <div className="actions-section">
                        <div className="filter-group">
                            <div className="inner-filter">
                                <span className="filter-icon">🔍</span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search movies..."
                                    className="filter-input"
                                />
                            </div>
                            <div className="inner-filter">
                                <span className="filter-icon">📅</span>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="filter-select"
                                >
                                    <option>All Years</option>
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                value={tempId}
                                onChange={(e) => setTempId(e.target.value)}
                                placeholder="ID..."
                                className="search-input"
                            />
                            <button type="submit" className="search-button">ID</button>
                        </form>

                        <button
                            onClick={handleRandomize}
                            className="action-btn"
                            title="Shuffle Collection"
                        >
                            Shuffle 🎲
                        </button>
                    </div>
                </div>

                <div className="categories-container">
                    <button
                        onClick={() => { setCollectionKey('ALL'); setTempId(''); }}
                        className={`category-chip ${collectionKey === 'ALL' ? 'active' : ''}`}
                    >
                        All Collections
                    </button>
                    {COLLECTION_CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`category-chip ${collectionKey === cat.id ? 'active' : ''}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {collectionInfo && !loading && !error && (
                    <div className="collection-overview">
                        <p>{collectionInfo.overview}</p>
                    </div>
                )}
            </header>

            <main className="content-area">
                {loading && <Loader />}

                {error && !loading && (
                    <div className="error-container">
                        <h2>Collection Sync Error</h2>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="retry-button">
                            Retry Sync
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <MovieList movies={filteredMovies} onScroll={handleScroll} />
                )}
            </main>
        </div>
    );
}

export default App;
