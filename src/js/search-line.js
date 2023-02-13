import MoviesApiService from "./api-service";
import templateFunction from '../templates/list-movies.hbs';

const moviesApiService = new MoviesApiService();

export default function onSearchLine(event) {
  event.preventDefault();
  const {
    elements: { search },
  } = event.currentTarget;

  moviesApiService.resetPage(); 

    moviesApiService.getSearchMovies(search.value).then(movies => {
      refs.main.innerHTML = templateFunction(movies.data.results)
      
      
    });
}

