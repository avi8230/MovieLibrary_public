import { searchMovies } from './webAccess.mjs';
import { displayMovies } from './list.mjs';

// Function to perform a movie search
async function performSearch() {
    try {
        // Get the search query from the 'search-input' element
        const query = document.getElementById('search-input').value;

        // Perform an asynchronous movie search based on the query
        const searchResults = await searchMovies(query);

        // Check if there are search results and if the results array has movies
        if (searchResults.results && searchResults.results.length > 0) {
            // Display the search results using the displayMovies function
            displayMovies(searchResults.results);
        }
    }
    catch (err) {
        // If an error occurs during the search, display an empty list of movies
        displayMovies([]);
    }
}

// ------------------------------
export {
    performSearch
}
