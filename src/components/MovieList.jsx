import PropTypes from 'prop-types';
import { memo, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import MovieCard from './MovieCard';

// Optimized Row Component
const Row = memo(({ index, style, data }) => {
    const movie = data[index];
    if (!movie) return null;

    return (
        <div style={style}>
            <MovieCard movie={movie} />
        </div>
    );
});

Row.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};

Row.displayName = 'MovieRow';

const MovieList = ({ movies, onScroll }) => {
    const listRef = useRef();

    if (!movies || movies.length === 0) {
        return (
            <div className="empty-state" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                No movies found in this collection.
            </div>
        );
    }

    return (
        <div style={{ height: '100%', width: '100%', outline: 'none' }}>
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        ref={listRef}
                        height={height}
                        width={width}
                        itemCount={movies.length}
                        itemSize={220} // Consistent card height + gap
                        itemData={movies}
                        onScroll={onScroll}
                        overscanCount={3} // Pre-renders 3 items outside view for smooth scroll (RecyclerView style)
                        style={{ overflowX: 'hidden' }}
                    >
                        {Row}
                    </List>
                )}
            </AutoSizer>
        </div>
    );
};

MovieList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    onScroll: PropTypes.func,
};

export default MovieList;
