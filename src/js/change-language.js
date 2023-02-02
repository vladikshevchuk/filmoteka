import templateFunction from '../templates/list-movies.hbs';
import templateFunctionEn from '../templates/list-movies-en.hbs';
import MoviesApiService from './api-service';
import refs from './refs';

const moviesApiService = new MoviesApiService();

export default function onClickLangEn() {
  refs.langEn.classList.add('is-active');
  refs.langRu.classList.remove('is-active');

  moviesApiService.changeLanguage('en');

  moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunctionEn(movies.data.results);
  });
}

export default function onClickLangRu() {
  refs.langRu.classList.add('is-active');
  refs.langEn.classList.remove('is-active');

  moviesApiService.changeLanguage('ru');

  moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunction(movies.data.results);
  });
}
