const API_KEY = "68ea69f9e966b31bd048c08ebf911d24";

let isSearchMode = false;

async function getMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  displayMovies(data.results);
}

async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  displayMovies(data.results);
}

function displayMovies(movies) {
  const container = document.getElementById("movies");

  if (!movies || movies.length === 0) {
    container.innerHTML = "No movies found 😢";
    return;
  }

  container.innerHTML = movies.map(movie => {
    const image = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    return `
      <div class="card">
        <img src="${image}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      </div>
    `;
  }).join("");
}

document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    isSearchMode = false;
    getMovies(); 
  } else {
    isSearchMode = true;
    searchMovies(value);
  }
});

window.onload = () => {
  getMovies();
};