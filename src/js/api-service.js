import axios from 'axios';

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
        `${MAIN_URL}movie/popular${API_KEY}&language=en&page=1`
      );
      return response.data.results;
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
