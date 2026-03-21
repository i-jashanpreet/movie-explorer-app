const API_KEY = "189bcaf7";

async function fetchMovies(query) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();
    return data.Search || [];
  } catch (error) {
    console.log("Error:", error);
  }
}

function displayMovies(movies) {
  const container = document.getElementById("movies");

  if (!movies.length) {
    container.innerHTML = "No movies found 😢";
    return;
  }

  container.innerHTML = movies.map(movie => `
    <div class="card">
      <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
  `).join("");
}

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", async () => {
  document.getElementById("movies").innerHTML = "Loading...";

  const movies = await fetchMovies(searchInput.value);
  displayMovies(movies);
});

window.onload = async () => {
  const movies = await fetchMovies("avengers");
  displayMovies(movies);
};