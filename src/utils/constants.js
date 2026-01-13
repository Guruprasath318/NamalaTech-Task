export const API_BASE_URL = 'https://api.themoviedb.org/3';

// Default collection ID
export const DEFAULT_COLLECTION_ID = '10';

/**
 * Expanded list of high-quality Movie Collections to showcase
 * the app's versatility and API integration.
 */
export const COLLECTION_CATEGORIES = [
    { id: '10', label: 'Star Wars' },
    { id: '263', label: 'The Dark Knight' },
    { id: '131292', label: 'Captain America' },
    { id: '86311', label: 'The Avengers' },
    { id: '1241', label: 'Harry Potter' },
    { id: '529845', label: 'John Wick' },
    { id: '119', label: 'Lord of the Rings' },
    { id: '230', label: 'The Godfather' },
    { id: '9485', label: 'Fast & Furious' },
    { id: '328', label: 'Jurassic Park' },
    { id: '8522', label: 'Mission: Impossible' },
    { id: '115575', label: 'Spider-Man' },
    { id: '374365', label: 'Toy Story' },
    { id: '8354', label: 'Ice Age' },
    { id: '9715', label: 'Rocky' },
    { id: '420', label: 'James Bond' },
    { id: '748', label: 'X-Men' },
    { id: '121938', label: 'Iron Man' },
    { id: '1575', label: 'Hunger Games' },
    { id: '435259', label: 'Frozen' }
];

/**
 * A larger pool of collection IDs to demonstrate the
 * "RecyclerView" performance during rapid shuffling.
 */
export const COLLECTION_POOL = [
    ...COLLECTION_CATEGORIES.map(c => c.id),
    '1241', '131', '386', '263', '1219', '295', '8091', '9715', '230', '9485',
    '2578', '115570', '115575', '115576', '131295', '131292', '528', '8354',
    '435259', '1575', '1733', '2151', '8522', '328', '420', '529845'
];

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
export const FALLBACK_IMAGE_URL = 'https://via.placeholder.com/200x300?text=No+Poster';
