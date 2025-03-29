const API_KEY = "4f46aae5b897189535efc406ce0154de";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    const responce = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await responce.json()
    return data.results;
};

export const searchMovies = async (query) => {
    const responce = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query

    )}`
);
    const data = await responce.json();
    return data.results;
};