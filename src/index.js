import templateFunction from './templates/list-movies.hbs';
import templateModalWindow from './templates/modal-window.hbs';
import templateModalWindowEn from './templates/modal-window-en.hbs';
import templateFunctionEn from './templates/list-movies-en.hbs';
import MoviesApiService from './js/api-service';
import refs from './js/refs';
import scroll from './js/scroll';
import pagination from './js/pagination';
import onClickWatched from './js/watched-and-queue';
import onClickQueue from './js/watched-and-queue';

const moviesApiService = new MoviesApiService();

// первичная загрузка страницы
let watchedMovies = {};
let queueMovies = {};

function getMovies() {
  moviesApiService.getMovieData().then(movies => {
    if (moviesApiService.language === 'ru-RU') {
      refs.main.innerHTML = templateFunction(movies.data.results);
    } else {
      refs.main.innerHTML = templateFunctionEn(movies.data.results);
    }

    pagination.movePageTo(moviesApiService.getPage());

    const itemsList = document.querySelectorAll('.js-item');

    itemsList.forEach((el, i) => {
      el.id = `${i + 0}`;
      el.addEventListener('click', e => {
        refs.modal.classList.add('open');
        if (moviesApiService.language === 'ru-RU') {
          refs.modal.innerHTML = templateModalWindow(
            movies.data.results[e.currentTarget.id]
          );
        } else {
          refs.modal.innerHTML = templateModalWindowEn(
            movies.data.results[e.currentTarget.id]
          );
        }

        const btnWatched = document.querySelector('.js-btn-watched');
        const btnQueue = document.querySelector('.js-btn-queue');

        btnWatched.addEventListener('click', e => {
          watchedMovies[`movie${e.target.id}`] = e.target.id;
          console.log(watchedMovies);
          localStorage.watched = JSON.stringify(watchedMovies);
        });

        btnQueue.addEventListener('click', e => {
          queueMovies[`movie${e.target.id}`] = e.target.id;
          console.log(queueMovies);
          localStorage.queue = JSON.stringify(queueMovies);
        });
      });
    });
  });
}

getMovies();

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

  console.log(moviesApiService.searchQuery);

  getMovies();
  scroll();
}

// переключение между вкладками

refs.library.addEventListener('click', e => {
  refs.form.classList.add('is-hidden');
  refs.navBtns.classList.remove('is-hidden');

  refs.menu.classList.remove('is-active');
  refs.library.classList.add('is-active');

  moviesApiService.cleanHTML();
  onClickQueue()
});

refs.menu.addEventListener('click', e => {
  refs.navBtns.classList.add('is-hidden');
  refs.form.classList.remove('is-hidden');

  refs.library.classList.remove('is-active');
  refs.menu.classList.add('is-active');

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

// пагинация

refs.paginationRef.addEventListener('click', onPaginationsBtnClick);

function onPaginationsBtnClick() {
  const currentPage = pagination.getCurrentPage();
  moviesApiService.setPage(currentPage);

  getMovies();
  scroll();
}

// Модальное окно

refs.modal.addEventListener('click', e => {
  if (e.target.classList.value === 'modal-window open') {
    refs.modal.classList.remove('open');
  }
});

// Выбор жанра

// refs.genres.forEach(genre => {
//   genre.addEventListener('click', e => {
//     refs.genres.forEach(genre => genre.classList.remove('is-active-genre'));
//     genre.classList.add('is-active-genre');

//     moviesApiService.setGenre(genre.textContent);
//     console.log(moviesApiService.getGenre());
//   })
// })

// Добавление фильмов в локалсторидж

refs.btnWatched.addEventListener('click', onClickWatched);

refs.btnQueue.addEventListener('click', onClickQueue);
