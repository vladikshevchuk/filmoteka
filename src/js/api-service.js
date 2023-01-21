import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';

const API_KEY = '?api_key=fb4eca5dd3545235e4fd6796c70d4d40';
const MAIN_URL = 'https://api.themoviedb.org/3/';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.language = 'ru';
  }

  async getMovies() {
    try {
      const response = await axios.get(
        `${MAIN_URL}movie/popular${API_KEY}&language=${this.language}&page=${this.page}`
      );
      this.incrementPage();
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async getSearchMovies(query) {
    try {
      const response = await axios.get(
        `${MAIN_URL}search/movie${API_KEY}&language=ru&page=1&query=${query}`
      );
      if (response.data.results.length < 1) {
        Notify.warning(
          'Извините, ничего не удалось найти. Попробуйте изменить строку поиска'
        );
      } else {
        Notify.success(`Найденно ${response.data.total_results} фильмов`);
        this.incrementPage();
        return response.data.results;
      }
    } catch (error) {
      console.error(error);
    }
  }

  cleanHTML() {
    return refs.main.innerHTML = '';
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  changeLanguage(lang) {
    this.language = lang;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get pageNum() {
    return this.page;
  }
}
