import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../styles/MovieCard.css';
import { FALLBACK_IMAGE_URL, IMAGE_BASE_URL } from '../utils/constants';

const MovieCard = React.memo(({ movie, style }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const { title, release_date, overview, poster_path, vote_average } = movie;

    // Construct image URL
    const imageUrl = poster_path
        ? `${IMAGE_BASE_URL}${poster_path}`
        : FALLBACK_IMAGE_URL;

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageLoaded(true); // Stop showing skeleton
        setImageError(true);
    };

    return (
        <div style={style} className="movie-card-wrapper">
            <div className="movie-card">
                <div className="movie-poster-container">
                    {!imageLoaded && <div className="poster-skeleton" />}
                    <img
                        src={imageError ? FALLBACK_IMAGE_URL : imageUrl}
                        alt={title}
                        className="movie-poster"
                        loading="lazy"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={{ display: imageLoaded ? 'block' : 'none' }}
                    />
                </div>
                <div className="movie-info">
                    <h3 className="movie-title" title={title}>{title}</h3>
                    <div className="movie-metadata">
                        <span className="movie-date">
                            {release_date ? new Date(release_date).toLocaleDateString() : 'Unknown Release Date'}
                        </span>
                        {vote_average !== undefined && (
                            <span className="movie-rating">
                                <span className="star-icon">★</span>
                                {vote_average.toFixed(1)}
                            </span>
                        )}
                    </div>
                    <p className="movie-overview">
                        {overview || 'No overview available.'}
                    </p>
                </div>
            </div>
        </div>
    );
});

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string,
        overview: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
    }).isRequired,
    style: PropTypes.object, // Passed by react-window
};

MovieCard.displayName = 'MovieCard';

export default MovieCard;
