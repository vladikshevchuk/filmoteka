import refs from './refs';
import MoviesApiService from './api-service';
import templateModalWindow from '../templates/modal-window.hbs';
import templateModalWindowEn from '../templates/modal-window-en.hbs';

const moviesApiService = new MoviesApiService();
let watchedMovies = {};
let queueMovies = {};

export default function modalWindow() {
  const itemsList = document.querySelectorAll('.js-item');

  itemsList.forEach(el => {
    el.addEventListener('click', e => {
      refs.modal.innerHTML = '';
      moviesApiService.getMoviesById(e.currentTarget.id).then(movie => {
        refs.modal.classList.add('open');
        if (moviesApiService.language === 'ru-RU') {
          refs.modal.innerHTML = templateModalWindow(movie.data);
        } else {
          refs.modal.innerHTML = templateModalWindowEn(movie.data);
        }

        const btnAddToWatched = document.querySelector('.js-btn-watched');
        const btnAddToQueue = document.querySelector('.js-btn-queue');

        btnAddToWatched.addEventListener('click', e => {
          watchedMovies[`movie${e.target.id}`] = e.target.id;
          console.log(watchedMovies);
          localStorage.watched = JSON.stringify(watchedMovies);
        });

        btnAddToQueue.addEventListener('click', e => {
          queueMovies[`movie${e.target.id}`] = e.target.id;
          console.log(queueMovies);
          localStorage.queue = JSON.stringify(queueMovies);
        });
      });
    });
  });
}
