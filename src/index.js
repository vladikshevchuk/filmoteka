import templateFunction from './templates/list-movies.hbs';
import MoviesApiService from './js/api-service';
import onSearchLine from './js/search-line';

const refMain = document.querySelector('main');

const moviesApiService = new MoviesApiService();

moviesApiService.getMovies().then(movies => {
    refMain.innerHTML = templateFunction(movies);
    console.log(movies);
});

const refForm = document.querySelector('form');
refForm.addEventListener('submit', onSearchLine);