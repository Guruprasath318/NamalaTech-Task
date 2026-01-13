const axios = require('axios');
const fs = require('fs');

const API_KEY = 'aece271ae927511a2c281e5f22a4b0cf';
const BASE_URL = 'https://api.themoviedb.org/3';

const queries = [
    'Star Wars',
    'The Dark Knight',
    'Captain America',
    'The Avengers',
    'Harry Potter',
    'John Wick',
    'Lord of the Rings',
    'The Godfather',
    'Fast & Furious',
    'Jurassic Park',
    'Mission: Impossible',
    'Spider-Man',
    'Toy Story',
    'Ice Age',
    'Rocky',
    'James Bond',
    'X-Men',
    'Iron Man',
    'Hunger Games',
    'Frozen'
];

async function findCollections() {
    let output = '';
    for (const query of queries) {
        try {
            const response = await axios.get(`${BASE_URL}/search/collection`, {
                params: {
                    api_key: API_KEY,
                    query: query
                }
            });
            const firstResult = response.data.results[0];
            if (firstResult) {
                output += `${query}: ${firstResult.id} (${firstResult.name})\n`;
                console.log(`${query}: ${firstResult.id} (${firstResult.name})`);
            } else {
                output += `${query}: NOT FOUND\n`;
                console.log(`${query}: NOT FOUND`);
            }
        } catch (error) {
            output += `Error searching for ${query}: ${error.message}\n`;
            console.error(`Error searching for ${query}:`, error.message);
        }
    }
    fs.writeFileSync('collection_results.txt', output);
}

findCollections();
