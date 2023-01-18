import templateFunction from './templates/list-movies.hbs';
import MoviesApiService from './js/api-service';

const refMain = document.querySelector('main');

const moviesApiService = new MoviesApiService();

moviesApiService.getMovies().then(movies => {
    refMain.innerHTML = templateFunction(movies);
    console.log(movies);
})
