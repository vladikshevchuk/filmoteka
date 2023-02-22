import MoviesApiService from '../js/api-service';
import templateLibrary from '../templates/movie-for-library.hbs';
import refs from './refs';

const moviesApiService = new MoviesApiService();

export default function onClickWatched() {
  moviesApiService.cleanHTML();
  refs.main.insertAdjacentHTML('beforeend', '<p class="alert">Здесь пока ничего нет</p>');

  const watchedList = JSON.parse(localStorage.watched);
  console.log(Object.values(watchedList));

  if (Object.values(watchedList).length > 0) {
    moviesApiService.cleanHTML();

    Object.values(watchedList).forEach(e => {
      moviesApiService.getMoviesById(e).then(movies => {
        refs.main.insertAdjacentHTML('beforeend', templateLibrary(movies.data));
        console.log(movies);
      });
    });
  }
}

export default function onClickQueue() {
  moviesApiService.cleanHTML();
  refs.main.insertAdjacentHTML('beforeend', '<p class="alert">Здесь пока ничего нет</p>');

  const queueList = JSON.parse(localStorage.queue);
  console.log(Object.values(queueList));

  Object.values(queueList).forEach(e => {
    moviesApiService.cleanHTML();

    moviesApiService.getMoviesById(e).then(movies => {
      refs.main.insertAdjacentHTML('beforeend', templateLibrary(movies.data));
    });
  });
}