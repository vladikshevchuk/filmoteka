import refs from './refs';
import MoviesApiService from './api-service';
import templateModalWindow from '../templates/modal-window.hbs';
import templateModalWindowEn from '../templates/modal-window-en.hbs';
import no_movie from '../images/no-movie.jpg';

const moviesApiService = new MoviesApiService();
let watchedMovies = {};
let queueMovies = {};
localStorage.watched = JSON.stringify(watchedMovies);
localStorage.queue = JSON.stringify(queueMovies);

// Открытие модального окна и добавление фильма в очередь (локал сторидж) по клику на кнопку

export function modalWindow() {
  const itemsList = document.querySelectorAll('.js-item');

  itemsList.forEach(el => {
    el.addEventListener('click', e => {
      refs.modal.innerHTML = '';
      console.log('modal', moviesApiService.getLanguage());
      moviesApiService.getMoviesById(e.currentTarget.id).then(movie => {
        refs.modal.classList.add('open');
        if (movie.data.poster_path === null) {
          movie.data.poster_path = no_movie;
        } else {
          movie.data.poster_path = 'https://image.tmdb.org/t/p/w500' + movie.data.poster_path;
        }

        
        if (moviesApiService.language === 'ru-RU') {
          refs.modal.innerHTML = templateModalWindow(movie.data);
        } else {
          refs.modal.innerHTML = templateModalWindowEn(movie.data);
        }

        const btnAddToWatched = document.querySelector('.js-btn-watched');
        const btnAddToQueue = document.querySelector('.js-btn-queue');

        btnAddToWatched.addEventListener('click', e => {
          watchedMovies[`movie${e.target.id}`] = e.target.id;
          localStorage.watched = JSON.stringify(watchedMovies);
        });

        btnAddToQueue.addEventListener('click', e => {
          queueMovies[`movie${e.target.id}`] = e.target.id;
          localStorage.queue = JSON.stringify(queueMovies);
        });
      });
    });
  });
}