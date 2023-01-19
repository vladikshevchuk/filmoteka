import templateFunction from './templates/list-movies.hbs';
import MoviesApiService from './js/api-service';
import onSearchLine from './js/search-line';
import refs from './js/refs';

const moviesApiService = new MoviesApiService();

moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunction(movies);
});

refs.form.addEventListener('submit', onSearchLine);
refs.library.addEventListener('click', e => {
    refs.form.classList.add('is-hidden');
    refs.navBtns.classList.remove('is-hidden');
});
refs.menu.addEventListener('click', e => {
    refs.navBtns.classList.add('is-hidden');
    refs.form.classList.remove('is-hidden');
});