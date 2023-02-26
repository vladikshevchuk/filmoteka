import templateFunction from './templates/list-movies.hbs';
import templateFunctionEn from './templates/list-movies-en.hbs';
import MoviesApiService from './js/api-service';
import refs from './js/refs';
import scroll from './js/scroll';
import pagination from './js/pagination';
import { onClickWatched, onClickQueue } from './js/watched-and-queue';
import { modalWindow } from './js/modal-window';
import no_movie from './images/no-movie.jpg'; 
import spinner from './js/spinner';

const moviesApiService = new MoviesApiService();

// Загрузка страницы

function getMovies() {
  moviesApiService.getMovieData().then(movies => {
    movies.data.results.map(movie => {
      if (movie.poster_path === null) {
        movie.poster_path = no_movie;
      } else {
        movie.poster_path = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
      }
      return movie;
    })
    if (moviesApiService.language === 'ru-RU') {
      refs.main.innerHTML = templateFunction(movies.data.results);
    } else {
      refs.main.innerHTML = templateFunctionEn(movies.data.results);
    }

    refs.paginationRef.classList.remove('is-hidden');
    refs.footer.classList.remove('position');
    pagination.movePageTo(moviesApiService.getPage());

    modalWindow();
  });
}

setTimeout(() => {getMovies()}, 2000);

// Поиск фильма по имени

refs.form.addEventListener('submit', onSearchLine);

function onSearchLine(event) {
  event.preventDefault();
  const {
    elements: { search },
  } = event.currentTarget;

  moviesApiService.resetPage();
  moviesApiService.setQuery(`${search.value}`);
  moviesApiService.setInitialization('search');

  getMovies();
  scroll();
}

// переключение между вкладками

refs.library.addEventListener('click', e => {
  refs.form.classList.add('is-hidden');
  refs.navBtns.classList.remove('is-hidden');

  refs.menu.classList.remove('is-active');
  refs.library.classList.add('is-active');

  refs.paginationRef.classList.add('is-hidden');

  moviesApiService.cleanHTML();
  moviesApiService.setInitialization('id');
  refs.main.insertAdjacentHTML('beforeend', '<ul class="list"></ul>');
  onClickWatched();
});

refs.menu.addEventListener('click', e => {
  refs.navBtns.classList.add('is-hidden');
  refs.form.classList.remove('is-hidden');

  refs.library.classList.remove('is-active');
  refs.menu.classList.add('is-active');

  refs.paginationRef.classList.remove('is-hidden');

  moviesApiService.resetPage();
  moviesApiService.setInitialization('popular');
  getMovies();
});

// переключение языка страницы

refs.langEn.addEventListener('click', onClickLangEn);
refs.langRu.addEventListener('click', onClickLangRu);

function onClickLangEn() {
  refs.langEn.classList.add('is-active');
  refs.langRu.classList.remove('is-active');

  moviesApiService.changeLanguage('en-US');

  getMovies();
}

function onClickLangRu() {
  refs.langRu.classList.add('is-active');
  refs.langEn.classList.remove('is-active');

  moviesApiService.changeLanguage('ru-RU');

  getMovies();
}

// Пагинация

refs.paginationRef.addEventListener('click', onPaginationsBtnClick);

function onPaginationsBtnClick() {
  const currentPage = pagination.getCurrentPage();
  moviesApiService.setPage(currentPage);

  getMovies();
  scroll();
}

// Закрытие модального окна

refs.modal.addEventListener('click', e => {
  if (e.target.classList.value === 'modal-window open') {
    refs.body.style.overflow = 'auto';
    refs.modal.classList.remove('open');
  }
});

// Работа кнопок Queue и Watched

refs.btnWatched.addEventListener('click', onClickWatched);
refs.btnQueue.addEventListener('click', onClickQueue);
