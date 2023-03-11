import MoviesApiService from '../js/api-service';
import templateLibrary from '../templates/movie-for-library.hbs';
import templateLibraryEn from '../templates/movie-for-library-en.hbs';
import { modalWindowForLibrary } from './modal-window';
import refs from './refs';
import scroll from './scroll';

const moviesApiService = new MoviesApiService();

export function onClickWatched() {
  moviesApiService.cleanHTML();
  refs.footer.classList.add('position');
  refs.btnWatched.classList.add('is-active');
  refs.btnQueue.classList.remove('is-active');
  let watchedList;

  if (localStorage.watched === undefined) {
    // refs.alert.classList.remove('is-hidden');
    return;
  } else {
    watchedList = JSON.parse(localStorage.watched);
  }

  createList(watchedList);
  scroll();
}

export function onClickQueue() {
  moviesApiService.cleanHTML();
  refs.footer.classList.add('position');

  refs.btnWatched.classList.remove('is-active');
  refs.btnQueue.classList.add('is-active');

  if (localStorage.queue === undefined) {
    refs.alert.classList.remove('is-hidden');
    return;
  } else {
    queueList = JSON.parse(localStorage.queue);
  }

  createList(queueList);
  scroll();
}

function createList(list) {
  const lang = localStorage.getItem('language');

  Object.values(list).forEach(e => {
    moviesApiService.cleanHTML();

    moviesApiService.getMoviesById(e).then(movies => {
      refs.footer.classList.remove('position');

      if (lang === 'ru-RU') {
        refs.main.insertAdjacentHTML('beforeend', templateLibrary(movies.data));
      } else {
        // make hbs for english
        refs.main.insertAdjacentHTML('beforeend', templateLibraryEn(movies.data));
      }

      const item = document.getElementById(`${e}`);
      item.addEventListener('click', modalWindowForLibrary);
    });
  });
}
