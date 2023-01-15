import axios from 'axios';

const API_KEY = '?api_key=fb4eca5dd3545235e4fd6796c70d4d40';
const MAIN_URL = 'https://api.themoviedb.org/3/';

async function getApiService() {
  try {
    const response = await axios.get(`${MAIN_URL}movie/popular${API_KEY}&language=en&page=1`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getApiService();