import refs from './refs';
import MoviesApiService from './api-service';
import templateModalWindow from '../templates/modal-window.hbs';
import templateModalWindowEn from '../templates/modal-window-en.hbs';
import templateModalWindowForLibrary from '../templates/modal-window-for-library.hbs';
import templateModalWindowForLibraryEn from '../templates/modal-window-for-library-en.hbs';
import no_movie from '../images/no-movie.jpg';
import { onClickWatched, onClickQueue } from '../js/watched-and-queue';

const moviesApiService = new MoviesApiService();
let watchedMovies = {};
let queueMovies = {};
let targetIdMovie = 0;

if (localStorage.watched) {
  watchedMovies = JSON.parse(localStorage.watched);
}

if (localStorage.queue) {
  queueMovies = JSON.parse(localStorage.queue);
}

// Открытие модального окна и добавление фильма в очередь (локал сторидж) по клику на кнопку

export function modalWindow() {
  const itemsList = document.querySelectorAll('.js-item');

  itemsList.forEach(el => {
    el.addEventListener('click', e => {
      refs.modal.innerHTML = '';
      targetIdMovie = e.currentTarget.id;
      const lang = localStorage.getItem('language');

      moviesApiService.getMoviesById(e.currentTarget.id).then(movie => {
        movie.data.genres = movie.data.genres
          .map(genre => genre.name)
          .join(', ');
        refs.modal.classList.add('open');
        refs.body.style.overflow = 'hidden';
        if (movie.data.poster_path === null) {
          movie.data.poster_path = no_movie;
        } else {
          movie.data.poster_path =
            'https://image.tmdb.org/t/p/w500' + movie.data.poster_path;
        }

        if (lang === 'ru-RU') {
          refs.modal.innerHTML = templateModalWindow(movie.data);
        } else {
          refs.modal.innerHTML = templateModalWindowEn(movie.data);
        }

        const btnAddToWatched = document.querySelector('.js-btn-watched');
        const btnAddToQueue = document.querySelector('.js-btn-queue');

        if (
          Object.values(watchedMovies).some(value => value === targetIdMovie)
        ) {
          btnAddToWatched.disabled = true;
          btnAddToWatched.classList.add('is-focus');
        } else {
          btnAddToWatched.addEventListener('click', e => {
            watchedMovies[`movie${e.target.id}`] = e.target.id;
            localStorage.watched = JSON.stringify(watchedMovies);
            btnAddToWatched.disabled = true;
            btnAddToWatched.classList.add('is-focus');
          });
        }

        if (Object.values(queueMovies).some(value => value === targetIdMovie)) {
          btnAddToWatched.disabled = true;
          btnAddToWatched.classList.add('is-focus');
        } else {
          btnAddToQueue.addEventListener('click', e => {
            queueMovies[`movie${e.target.id}`] = e.target.id;
            localStorage.queue = JSON.stringify(queueMovies);
            btnAddToQueue.disabled = true;
            btnAddToQueue.classList.add('is-focus');
          });
        }
      });
    });
  });
}

export function modalWindowForLibrary(e) {
  refs.modal.innerHTML = '';
  const lang = localStorage.getItem('language');
  targetIdMovie = e.currentTarget.id;
  moviesApiService.getMoviesById(e.currentTarget.id).then(movie => {
    movie.data.genres = movie.data.genres.map(genre => genre.name).join(', ');
    refs.modal.classList.add('open');
    refs.body.style.overflow = 'hidden';
    if (movie.data.poster_path === null) {
      movie.data.poster_path = no_movie;
    } else {
      movie.data.poster_path =
        'https://image.tmdb.org/t/p/w500' + movie.data.poster_path;
    }

    if (lang === 'ru-RU') {
      refs.modal.innerHTML = templateModalWindowForLibrary(movie.data);
    } else {
      refs.modal.innerHTML = templateModalWindowForLibraryEn(movie.data);
    }

    const btnAddToWatched = document.querySelector('.js-btn-watched');
    const btnAddToQueue = document.querySelector('.js-btn-queue');

    if (!Object.values(watchedMovies).some(value => value === targetIdMovie)) {
      btnAddToWatched.disabled = true;
      btnAddToWatched.classList.add('is-focus');
    }

    if (!Object.values(queueMovies).some(value => value === targetIdMovie)) {
      btnAddToQueue.disabled = true;
      btnAddToQueue.classList.add('is-focus');
    }

    btnAddToWatched.addEventListener('click', e => {
      delete watchedMovies[`movie${e.target.id}`];
      localStorage.watched = JSON.stringify(watchedMovies);
      btnAddToWatched.disabled = true;
      btnAddToWatched.classList.add('is-focus');
      if (refs.btnWatched.classList.value === 'button is-active') {
        onClickWatched();
        refs.body.style.overflow = 'auto';
        refs.modal.classList.remove('open');
      }
    });

    btnAddToQueue.addEventListener('click', e => {
      delete queueMovies[`movie${e.target.id}`];
      localStorage.queue = JSON.stringify(queueMovies);
      btnAddToQueue.disabled = true;
      btnAddToQueue.classList.add('is-focus');
      if (refs.btnQueue.classList.value === 'button is-active') {
        onClickQueue();
        refs.body.style.overflow = 'auto';
        refs.modal.classList.remove('open');
      }
    });
  });
}

// Закрытие модального окна

export function closeModalWindow(e) {
  if (e.target.classList.value === 'modal-window open') {
    refs.body.style.overflow = 'auto';
    refs.modal.classList.remove('open');
  }
}
