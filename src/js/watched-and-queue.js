import MoviesApiService from '../js/api-service';
import templateLibrary from '../templates/movie-for-library.hbs';
import { modalWindowForLibrary } from './modal-window';
import refs from './refs';
import scroll from './scroll';

const moviesApiService = new MoviesApiService();

export function onClickWatched() {
  moviesApiService.cleanHTML();
  refs.footer.classList.add('position');
  refs.btnWatched.classList.add('is-active');
  refs.btnQueue.classList.remove('is-active');

  if (localStorage.watched === undefined) {
    refs.alert.classList.remove('is-hidden');
    return
  } else {
    watchedList = JSON.parse(localStorage.watched);
  }

  Object.values(watchedList).forEach(e => {
    moviesApiService.cleanHTML();

    moviesApiService.getMoviesById(e).then(movies => {
      refs.footer.classList.remove('position');
      refs.main.insertAdjacentHTML('beforeend', templateLibrary(movies.data));
    });
  });
  // setTimeout(() => {
  //     const itemsList = document.querySelectorAll('.js-item');
  //     console.log(itemsList);
  //     itemsList.forEach(item => {
  //       item.addEventListener('click', e => {
  //         console.log(e.currentTarget.id);
  //         refs.modal.classList.add('open');
  //         moviesApiService.getMoviesById(e).then(movies => {
  //     refs.main.insertAdjacentHTML('beforeend', modalWindowForLibrary(movies.data));
  //   });
  //       })
  //     })
  //   }, 1000)
  scroll();
}

export function onClickQueue() {
  moviesApiService.cleanHTML();
  refs.footer.classList.add('position');
  
  refs.btnWatched.classList.remove('is-active');
  refs.btnQueue.classList.add('is-active');

  if (localStorage.queue === undefined) {
    refs.alert.classList.remove('is-hidden');
    return
  } else {
    queueList = JSON.parse(localStorage.queue);
  }

  Object.values(queueList).forEach(e => {
    moviesApiService.cleanHTML();

    moviesApiService.getMoviesById(e).then(movies => {
      refs.footer.classList.remove('position');
      refs.main.insertAdjacentHTML('beforeend', templateLibrary(movies.data));
    });
  });
  scroll();
}
