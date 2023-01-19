import MoviesApiService from "./api-service";

const moviesApiService = new MoviesApiService();

export default function onSearchLine(event) {
  event.preventDefault();
  const {
    elements: { search },
  } = event.currentTarget;
    console.log(search.value);
    
    moviesApiService.getSearchMovies(search.value);
}

