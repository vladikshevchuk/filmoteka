import templateFunction from './templates/list-movies.hbs';
import templateModalWindow from './templates/modal-window.hbs';
import templateFunctionEn from './templates/list-movies-en.hbs';
import MoviesApiService from './js/api-service';
import onSearchLine from './js/search-line';
import refs from './js/refs';
import scroll from './js/scroll';

const moviesApiService = new MoviesApiService();

// первичная загрузка страницы

function getMovies() {
  moviesApiService.getMovies().then(movies => {
    refs.main.innerHTML = templateFunction(movies.data.results);
    
    console.log(movies.data.results[0])

  const itemsList = document.querySelectorAll('.js-item');

    itemsList.forEach((el, i) => {
      el.id = `${i + 0}`;
      el.addEventListener('click', e => {
        // console.log(e.currentTarget.id);
        
        refs.modal.classList.add('open');
        refs.modal.innerHTML = templateModalWindow(movies.data.results[e.currentTarget.id])
    })}
  );
});
}

getMovies();

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
  getMovies()
});

// переключение языка страницы

refs.langEn.addEventListener('click', onClickLangEn);
refs.langRu.addEventListener('click', onClickLangRu);

function onClickLangEn() {
  refs.langEn.classList.add('is-active');
  refs.langRu.classList.remove('is-active');

  moviesApiService.changeLanguage('en');

  getMovies()
}

function onClickLangRu() {
  refs.langRu.classList.add('is-active');
  refs.langEn.classList.remove('is-active');

  moviesApiService.changeLanguage('ru');

  getMovies()
}

// пагинация

refs.nextBtn.addEventListener('click', onNextBtn);
refs.backBtn.addEventListener('click', onBackBtn);

function onNextBtn() {
  moviesApiService.nextPage();
  refs.pageNumber.textContent = moviesApiService.page;

  getMovies()

  scroll();
}

function onBackBtn() {
  moviesApiService.backPage();
  refs.pageNumber.textContent = moviesApiService.page;

  getMovies()

  scroll();
}

// Модальное окно

refs.modal.addEventListener('click', e => {
  if (e.target.classList.value === 'modal-window open') {
    refs.modal.classList.remove('open');
  }
  
  console.log(e.target.classList.value)
});