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
    this.language = 'ru-RU';
    this.searchQuery = '';
    // this.genre = '';
  }

  getMovieData() {
    const getRequest = getRequests.getRequest;

    if (this.initialization === getRequest.POPULAR) {
      return this.getMovies()
    }
    if (this.initialization === getRequest.BY_NAME) {
      return this.getSearchMovies()
    }
    if (this.initialization === getRequest.BY_ID) {
      return
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
        if (this.language === 'ru-Ru') {
          Notify.warning(
          'Извините, ничего не удалось найти. Попробуйте изменить запрос'
          );
        } else {
          Notify.warning(
          'Sorry, nothing could be found. Try changing the request'
          );
        }
      } else {
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // async getGenreOfMovies() {
  //   try {
  //     const response = await axios.get(
  //       `${MAIN_URL}discover/movie${API_KEY}&language=${this.language}&with_genres=${this.genre}&page=${this.page}`
  //     )
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async getMoviesById(id) {
    try {
      const response = await axios.get(
        `${MAIN_URL}movie/${id}${API_KEY}&language=${this.language}&append_to_response=videos,reviews,credits`
      )
      console.log(this.language);
      return response;
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
    console.log('test', lang);
    this.language = lang;
  }

  getLanguage() {
    return this.language;
  }

  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }

  setInitialization(newInit) {
    this.initialization = newInit;
  }

  getGenre() {
    return this.genre;
  }

  setGenre(newGenry) {
    this.genre = newGenry;
  }
}
