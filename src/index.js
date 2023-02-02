import templateFunction from './templates/list-movies.hbs';
import templateFunctionEn from './templates/list-movies-en.hbs';
import MoviesApiService from './js/api-service';
import onSearchLine from './js/search-line';
import refs from './js/refs';
// import onClickLangEn from './js/change-language';
// import onClickLangRu from './js/change-language';
import paginationBtn from './js/pagination';

const moviesApiService = new MoviesApiService();

// первичная загрузка страницы

moviesApiService.getMovies().then(movies => {
  refs.main.innerHTML = templateFunction(movies.data.results);
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

  moviesApiService.resetPage();
  refs.pageNumber.textContent = moviesApiService.page;
  moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunction(movies.data.results);
  });
});

// переключение языка страницы

refs.langEn.addEventListener('click', onClickLangEn);

refs.langRu.addEventListener('click', onClickLangRu);

function onClickLangEn() {
  refs.langEn.classList.add('is-active');
  refs.langRu.classList.remove('is-active');

  moviesApiService.changeLanguage('en');

  moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunctionEn(movies.data.results);
  });
}

function onClickLangRu() {
  refs.langRu.classList.add('is-active');
  refs.langEn.classList.remove('is-active');

  moviesApiService.changeLanguage('ru');

  moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunction(movies.data.results);
  });
}

// пагинация

refs.nextBtn.addEventListener('click', onNextBtn);
refs.backBtn.addEventListener('click', onBackBtn);

function onNextBtn() {
    moviesApiService.nextPage();
    refs.pageNumber.textContent = moviesApiService.page;

    moviesApiService.getMovies().then(movies => {
        refs.main.innerHTML = templateFunction(movies.data.results);
    })
}

function onBackBtn() {
  moviesApiService.backPage();
  refs.pageNumber.textContent = moviesApiService.page;
  moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunction(movies.data.results);
  });
}
