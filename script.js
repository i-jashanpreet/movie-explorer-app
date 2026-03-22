const API_KEY = "68ea69f9e966b31bd048c08ebf911d24";

let page = 1;
let moviesData = [];
let isSearchMode = false;

async function getMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  moviesData = [...moviesData, ...data.results];
  renderMovies(moviesData);
}

async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  moviesData = data.results;
  renderMovies(moviesData);
}

function renderMovies(movies) {
  const container = document.getElementById("movies");

  if (!movies.length) {
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
        <p>${movie.release_date || "N/A"}</p>
      </div>
    `;
  }).join("");
}

window.addEventListener("scroll", () => {
  if (isSearchMode) return;

  const reachedBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (reachedBottom) {
    page++;
    getMovies();
  }
});

document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    isSearchMode = false;
    page = 1;
    moviesData = [];
    getMovies();
  } else {
    isSearchMode = true;
    searchMovies(value);
  }
});

function sortByDate() {
  const sorted = [...moviesData].sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );
  renderMovies(sorted);
}

function sortByRating() {
  const sorted = [...moviesData].sort(
    (a, b) => b.vote_average - a.vote_average
  );
  renderMovies(sorted);
}

function filterPlatform(type) {
  if (type === "all") {
    renderMovies(moviesData);
    return;
  }

  const filtered = moviesData.filter(movie => {
    if (type === "netflix") return movie.vote_average > 7;
    if (type === "prime") return movie.vote_average <= 7;
  });

  renderMovies(filtered);
}

function toggleMode() {
  document.body.classList.toggle("light");
}
window.onload = () => {
  getMovies();
};
