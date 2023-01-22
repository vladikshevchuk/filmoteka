import templateFunction from './templates/list-movies.hbs';
import MoviesApiService from './js/api-service';
import onSearchLine from './js/search-line';
import refs from './js/refs';

const moviesApiService = new MoviesApiService();

// первичная загрузка страницы

moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunction(movies);
});

refs.form.addEventListener('submit', onSearchLine);

// переключение между вкладками

refs.library.addEventListener('click', e => {
    refs.form.classList.add('is-hidden');
    refs.navBtns.classList.remove('is-hidden');
    
    refs.menu.classList.remove('is-active');
    refs.library.classList.add('is-active');

    moviesApiService.cleanHTML();
});
refs.menu.addEventListener('click', e => {
    refs.navBtns.classList.add('is-hidden');
    refs.form.classList.remove('is-hidden');

    refs.library.classList.remove('is-active');
    refs.menu.classList.add('is-active');

    moviesApiService.getMovies().then(movies => {
        refs.main.innerHTML = templateFunction(movies);
    });
});

// переключение языка страницы

refs.langEn.addEventListener('click', e => {
    refs.langEn.classList.add('is-active');
    refs.langRu.classList.remove('is-active');

    moviesApiService.changeLanguage('en');

    moviesApiService.getMovies().then(movies => {
        refs.main.innerHTML = templateFunction(movies);
    });
});
refs.langRu.addEventListener('click', e => {
    refs.langRu.classList.add('is-active');
    refs.langEn.classList.remove('is-active');

    moviesApiService.changeLanguage('ru');

    moviesApiService.getMovies().then(movies => {
        refs.main.innerHTML = templateFunction(movies);
    });
});

// пагинация
