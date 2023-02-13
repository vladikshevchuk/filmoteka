import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';
import getRequests from './get-requests';

const API_KEY = '?api_key=fb4eca5dd3545235e4fd6796c70d4d40';
const MAIN_URL = 'https://api.themoviedb.org/3/';

export default class MoviesApiService {
  constructor() {
    this.initialization = 'popular';
    this.page = 1;
    this.language = 'ru';
    this.searchQuery = '';
  }

  getMovieData() {
    const getRequest = getRequests.getRequest;

    if (this.initialization === getRequest.POPULAR) {
      return this.getMovies()
    }
    if (this.initialization === getRequest.BY_NAME) {
      return this.getSearchMovies()
    }
  }

  async getMovies() {
    try {
      const response = await axios.get(
        `${MAIN_URL}movie/popular${API_KEY}&language=${this.language}&page=${this.page}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getSearchMovies() {
    try {
      const response = await axios.get(
        `${MAIN_URL}search/movie${API_KEY}&language=${this.language}&page=${this.page}&query=${this.searchQuery}`
      );
      if (response.data.results.length < 1) {
        Notify.warning(
          'Извините, ничего не удалось найти. Попробуйте изменить строку поиска'
        );
      } else {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  }

  cleanHTML() {
    return refs.main.innerHTML = '';
  }

  getPage() {
    return this.page;
  }

  setPage(currentPage) {
    this.page = currentPage;
  }

  resetPage() {
    this.page = 1;
  }

  changeLanguage(lang) {
    this.language = lang;
  }

  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }

  setInitialization(newInit) {
    this.initialization = newInit;
  }
}
