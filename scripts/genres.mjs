import { fetchGenres, getMoviesByGenre } from './webAccess.mjs';
import { displayMovies } from './list.mjs';

// Function to create a dropdown list of movie genres
async function createDropdownList() {
    // Get the HTML element with the ID 'genres-select'
    const genresSelect = document.getElementById('genres-select');

    try {
        // Fetch the list of genres asynchronously
        const genres = await fetchGenres();

        // Check if there are genres available
        if (genres.length > 0) {
            // Iterate through each genre and create an option element for the dropdown
            genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                // Append the option to the genres dropdown
                genresSelect.appendChild(option);
            });
        } else {
            // Handle the case where no genres are available
            genresSelect.innerHTML = '<option value="">No genres found</option>';
        }
    } catch (error) {
        // Handle any errors that occur during the genre fetching process
        console.error('Error fetching genres:', error);
        // Display an error message in the dropdown
        genresSelect.innerHTML = '<option value="">Error fetching genres</option>';
    }
};

// Function to fetch movies when a genre is selected
async function fetchMoviesByGenre() {
    // Get the selected genre ID from the 'genres-select' dropdown
    const selectedGenreId = document.getElementById('genres-select').value;
    // Fetch movies based on the selected genre ID
    const movies = await getMoviesByGenre(selectedGenreId);
    // Display the fetched movies
    displayMovies(movies.results);
}

// ------------------------------
export {
    createDropdownList,
    fetchMoviesByGenre
}
