import MoviesApiService from "./api-service";
import templateFunction from '../templates/list-movies.hbs';

const moviesApiService = new MoviesApiService();
const refMain = document.querySelector('main');

export default function onSearchLine(event) {
  event.preventDefault();
  const {
    elements: { search },
  } = event.currentTarget;
    console.log(search.value);
    
    moviesApiService.getSearchMovies(search.value).then(movies => {
        refMain.innerHTML = templateFunction(movies)
    });
}

