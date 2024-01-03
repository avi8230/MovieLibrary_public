
// The Movie Database API key for authentication
// https://www.themoviedb.org/settings/api
const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

// =========================================================
// Function to fetch popular movies from The Movie Database
// Movie Database API Documentation:
// https://developer.themoviedb.org/docs/finding-data
// https://developer.themoviedb.org/reference/trending-all
async function fetchMovies() {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;
    try {
        // Perform an asynchronous fetch request to the Movie Database API
        const response = await fetch(apiUrl);
        // Check if the HTTP response is successful (status code 200)
        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
        // Parse the JSON response and return the list of movie results
        const data = await response.json();
        return data.results;
    } catch (error) {
        // Handle errors that occur during the fetch operation
        console.error("Error fetching movies:", error);
        // Return an empty array in case of an error
        return [];
    }
}

// =========================================================
// Function to fetch the trailer for a specific movie from The Movie Database
// Movie Database API Documentation:
// https://developer.themoviedb.org/reference/movie-videos
async function fetchTrailer(movieId) {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
        const data = await response.json();

        // Check if there are video results for the movie
        if (data.results && data.results.length > 0) {
            // Extract the key of the first video result (assuming it's a YouTube key)
            const trailerKey = data.results[0].key;
            // Construct a YouTube link using the extracted key
            const youtubeLink = `https://www.youtube.com/watch?v=${trailerKey}`;
            return Promise.resolve(youtubeLink);
        } else {
            return Promise.reject("No trailers available for this movie.");
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
        return Promise.reject("Error fetching trailer");
    }
}

// =========================================================
// Function to search for movies using The Movie Database API
// Movie Database API Documentation:
// https://developer.themoviedb.org/reference/search-movie
async function searchMovies(query) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return Promise.resolve(data);
        } else {
            return Promise.reject("No movies found for the given search query.");
        }
    } catch (error) {
        console.error("Error searching movies:", error);
        return Promise.reject("Error searching movies");
    }
}

// =========================================================
// Function to fetch movie genres from The Movie Database API
async function fetchGenres() {
    const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
        const data = await response.json();

        // Check if there are genre results
        if (data.genres && data.genres.length > 0) {
            // Extract genre details from the results and format them as an array of objects
            const genres = data.genres.map(genre => ({
                id: genre.id,
                name: genre.name
            }));

            return Promise.resolve(genres);
        } else {
            return Promise.reject("No genres found.");
        }
    } catch (error) {
        console.error("Error fetching genres:", error);
        return Promise.reject("Error fetching genres");
    }
}

// =========================================================
// Function to fetch movies by genre from The Movie Database API
// Movie Database API Documentation:
// https://developer.themoviedb.org/reference/discover-movie
async function getMoviesByGenre(genreId) {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
        const data = await response.json();

        // Check if there are movie results for the given genre
        if (data.results && data.results.length > 0) { return data; }
        else {
            console.log("No movies found for the given genre.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching movies by genre:", error);
        return [];
    }
}

// ------------------------------
export {
    fetchMovies,
    fetchTrailer,
    searchMovies,
    fetchGenres,
    getMoviesByGenre,
}
