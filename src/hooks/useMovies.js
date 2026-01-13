import { useCallback, useEffect, useState } from 'react';
import { getCollectionDetails } from './services/tmdbApi';

/**
 * Custom hook to fetch movies from specific collections.
 * Supports fetching a single ID or an array of IDs for batch merging.
 */
export const useMovies = (idOrIds) => {
    const [movies, setMovies] = useState([]);
    const [collectionInfo, setCollectionInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovies = useCallback(async () => {
        if (!idOrIds || (Array.isArray(idOrIds) && idOrIds.length === 0)) return;

        setLoading(true);
        setError(null);

        try {
            if (Array.isArray(idOrIds)) {
                // Batch Load Mode: Request all collections concurrently
                const requests = idOrIds.map(id => getCollectionDetails(id).catch(() => null));
                const responses = await Promise.all(requests);

                // Merge all movies, filter out failed requests (nulls)
                const allMovies = responses
                    .filter(res => res !== null)
                    .flatMap(res => res.parts || []);

                // Deduplicate movies by ID
                const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());

                // Sort by popularity to show the best movies first in the virtual list
                uniqueMovies.sort((a, b) => b.popularity - a.popularity);

                setMovies(uniqueMovies);
                setCollectionInfo({
                    name: 'All Global Collections',
                    overview: `Combined view of ${uniqueMovies.length} movies from across all curated collections. Demonstrated with high-performance virtualization.`,
                });
            } else {
                // Single Collection Mode
                const data = await getCollectionDetails(idOrIds);
                const sortedParts = (data.parts || []).sort((a, b) => b.popularity - a.popularity);

                setMovies(sortedParts);
                setCollectionInfo({
                    name: data.name,
                    overview: data.overview,
                });
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            setError(err.message || 'Failed to sync with TMDB server.');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, [idOrIds]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return { movies, collectionInfo, loading, error, refetch: fetchMovies };
};
