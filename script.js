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