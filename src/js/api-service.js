import axios from 'axios';
import { log } from 'handlebars';
import templateFunction from '../templates/list-movies.hbs';

const API_KEY = '?api_key=fb4eca5dd3545235e4fd6796c70d4d40';
const MAIN_URL = 'https://api.themoviedb.org/3/';

const refMain = document.querySelector('main');

async function getApiService() {
  try {
    const response = await axios.get(`${MAIN_URL}movie/popular${API_KEY}&language=en&page=1`);
      return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

getApiService().then(movies => {
    refMain.innerHTML = templateFunction(movies);
    console.log(movies);
});

