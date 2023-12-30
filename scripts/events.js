import { fetchMovies } from './webAccess.mjs';
import { displayMovies } from './list.mjs';
import { createDropdownList, fetchMoviesByGenre } from './genres.mjs';
import { performSearch } from './search.mjs';
import { displayFavoritesModal } from './favorites.mjs';

// Fetch and display movies on window load
window.onload = async function () {
    const movies = await fetchMovies();
    displayMovies(movies);

    // create dropdown list
    createDropdownList();
};

// Search by clicking the search button
const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', performSearch);

// Fetch movies when a genre is selected
const select = document.getElementById('genres-select');
select.addEventListener('change', fetchMoviesByGenre);

// Displaying favorites when the favorites button is clicked.
const favorites = document.getElementById('favoritesIcon');
favorites.addEventListener('click', displayFavoritesModal);
