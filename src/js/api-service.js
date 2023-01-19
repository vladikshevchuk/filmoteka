import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const API_KEY = '?api_key=fb4eca5dd3545235e4fd6796c70d4d40';
const MAIN_URL = 'https://api.themoviedb.org/3/';

export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getMovies() {
    try {
      const response = await axios.get(
        `${MAIN_URL}movie/popular${API_KEY}&language=en-US&page=1`
      );
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async getSearchMovies(query) {
    try {
      const response = await axios.get(
        `${MAIN_URL}search/movie${API_KEY}&language=en-US&page=1&query=${query}`
      );
      if (response.data.results.length < 1) {
        Notify.warning(
          'Извините, ничего не удалось найти. Попробуйте изменить строку поиска'
        );
      } else {
        Notify.success(`Найденно ${response.data.total_results} фильмов`);
        return response.data.results;
      }
    } catch (error) {
      console.error(error);
    }
  }

  cleanHTML() {
    refs.gallery.innerHTML = '';
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
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
