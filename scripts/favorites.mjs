// Function to save a movie to favorites
function saveToFavorites(movie) {
    // Check if localStorage is supported
    if (typeof Storage !== "undefined") {
        // Get existing favorites from localStorage or initialize an empty array
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Check if the movie is already in favorites
        const isAlreadyFavorite = favorites.some(favorite => favorite.id === movie.id);

        if (!isAlreadyFavorite) {
            // Add the movie to favorites
            favorites.push(movie);

            // Save the updated favorites to localStorage
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(`Added ${movie.title} to favorites.`);
        } else {
            alert(`${movie.title} is already in favorites.`);
        }
    } else {
        // Handle the case where localStorage is not supported
        console.error("LocalStorage is not supported. Unable to save to favorites.");
    }
}

// Function to display favorite movies in a modal
function displayFavoritesModal() {
    // Retrieve the HTML element with the ID "favorites-container".
    const favoritesContainer = document.getElementById("favorites-container");

    // Clear the content inside the "favorites-container".
    favoritesContainer.innerHTML = '';
    // Retrieve the list of favorite movies from the local storage or initialize an empty array.
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // If there are no favorites, hide the container, display an alert, and return from the function.
    if (favorites.length === 0) {
        favoritesContainer.style.display = "none";
        alert('You have no favorites :-(');
        return;
    }

    // Iterate through each favorite movie and create a card for display.
    favorites.forEach(favorite => {
        const favoriteCard = document.createElement("div");
        favoriteCard.classList.add("favorite-card");

        // Create an element for the movie title.
        const titleElement = document.createElement("h3");
        titleElement.textContent = favorite.title;

        // Create an icon for removing the movie from favorites and set the click event.
        const heartMinusIcon = document.createElement("i");
        heartMinusIcon.classList.add("fa-solid", "fa-heart-circle-minus");
        heartMinusIcon.onclick = function () { removeFavoriteMovie(favorite.id) };

        // Create an image element for the movie poster.
        const posterElement = document.createElement("img");
        posterElement.src = `https://image.tmdb.org/t/p/w200/${favorite.poster_path}`;
        posterElement.alt = favorite.title;

        // Append the elements to the favorite card and the card to the favorites container.
        favoriteCard.appendChild(posterElement);
        favoriteCard.appendChild(titleElement);
        favoriteCard.appendChild(heartMinusIcon);

        favoritesContainer.appendChild(favoriteCard);
    });

    // Create a "Close" button and set its click event to hide the favorites container.
    const closeFavoriteButton = document.createElement("button");
    closeFavoriteButton.innerHTML = "Close";
    closeFavoriteButton.addEventListener("click", () => favoritesContainer.style.display = "none");
    favoritesContainer.appendChild(closeFavoriteButton);

    // Display the favorites container.
    favoritesContainer.style.display = "block";
}

// Function to remove a movie from favorites
function removeFavoriteMovie(movieId) {
    // Get the current favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Find the index of the movie with the given ID in the favorites array
    const indexToRemove = favorites.findIndex(movie => movie.id === movieId);

    // If the movie is found, remove it from the favorites array
    if (indexToRemove !== -1) {
        favorites.splice(indexToRemove, 1);

        // Update the favorites in localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movieId} Removed from favorites.`);
    }

    const favoritesContainer = document.getElementById("favorites-container");
    if (favoritesContainer.style.display === "block") {
        displayFavoritesModal();
    }
}

// ------------------------------
export {
    saveToFavorites,
    displayFavoritesModal,
    removeFavoriteMovie,
}