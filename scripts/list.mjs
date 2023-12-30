import { fetchTrailer } from './webAccess.mjs';
import { saveToFavorites, removeFavoriteMovie } from './favorites.mjs';

// Function to display movies
function displayMovies(movies) {
    // Get the HTML element with the ID 'movies-list'
    const moviesList = document.getElementById("movies-list");
    // Clear the content inside the 'movies-list'
    moviesList.innerHTML = '';

    // Check if there are no movies to display
    if (movies.length === 0) {
        moviesList.innerHTML = 'No trailers available for this movie.';
    }

    // Iterate through each movie in the provided array
    movies.forEach(async movie => {
        // Create a container for the movie card
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        // Create an image element for the movie poster
        const movieImage = document.createElement("img");
        movieImage.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
        movieImage.alt = movie.title;

        // Set an onclick event to display movie details
        const trailerLink = await fetchTrailer(movie.id);
        movieImage.onclick = function () { showMovieDetails(movie, trailerLink); };

        // Create a heart icon for adding the movie to favorites
        const heartPlusIcon = document.createElement("i");
        heartPlusIcon.classList.add("fa-solid", "fa-heart-circle-plus");
        heartPlusIcon.onclick = function () { saveToFavorites(movie) };

        // Create a heart icon for removing the movie from favorites
        const heartMinusIcon = document.createElement("i");
        heartMinusIcon.classList.add("fa-solid", "fa-heart-circle-minus");
        heartMinusIcon.onclick = function () { removeFavoriteMovie(movie.id) };

        // Append the heart icon to the movie card
        movieCard.appendChild(heartPlusIcon);
        movieCard.appendChild(heartMinusIcon);

        // Append the movie image to the movie card
        movieCard.appendChild(movieImage);

        // Append the movie card to the movies list
        moviesList.appendChild(movieCard);
    });
}

// Function to display movie details overlay
function showMovieDetails(movie, trailerLink) {
    // Get references to HTML elements for movie details overlay
    const overlay = document.getElementById('movie-details-overlay');
    const image = document.getElementById('movie-details-image');
    const trailer = document.getElementById('movie-details-trailer');
    const title = document.getElementById('movie-details-title');
    const releaseDate = document.getElementById('movie-details-release-date');
    const rating = document.getElementById('movie-details-rating');
    const overview = document.getElementById('movie-details-overview');
    const closeBtn = document.getElementById('close-button');

    // Set the source of the image element to the movie poster path
    image.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;

    // Set the text content of title, release date, rating, and overview elements
    title.textContent = movie.title;
    releaseDate.textContent = `Release Date: ${movie.release_date}`;
    rating.textContent = `Rating: ${movie.vote_average}`;
    overview.textContent = movie.overview;

    // Set the href and target of the trailer link element
    trailer.href = trailerLink;
    trailer.target = "_blank";

    // Display the movie details overlay
    overlay.style.display = 'block';

    // Set an onclick event for the close button to hide the overlay
    closeBtn.onclick = function () {
        overlay.style.display = 'none';
    };
}

// ------------------------------
export {
    displayMovies
}
