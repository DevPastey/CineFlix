import dotenv from "dotenv";

dotenv.config();

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}

export const fetchMovies = async({ query }: { query: string }) => {
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    const res = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });


    if (!res.ok) {
     // @ts-ignore
        throw new Error("Failed to fetch movies", res.statusText);
    }

    const data = await res.json();

    console.log(data);

    return data.results;

    

}

// console.log(TMDB_CONFIG.API_KEY);


// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGU1NzA5M2YyMDQ4Zjg4YmQyZDlmMjllMzM4NWYzMCIsIm5iZiI6MTc1ODkyMDMxNC4yNDk5OTk4LCJzdWIiOiI2OGQ2ZmU3YTYxZDY4YWNjYTVlMWFmODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UBTy1zg0nvkpACA2rK4AsMRt7Ci2OP4O4uqFLLByTgo'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));