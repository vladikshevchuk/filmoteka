import MoviesApiService from "./api-service";
import refs from "./refs";

const moviesApiService = new MoviesApiService();

const genresRu = [
  'боевик',
  'вестерн',
  'военный',
  'детектив',
  'документальный',
  'драма',
  'история',
  'комедия',
  'криминал',
  'мелодрама',
  'музыка',
  'мультфильм',
  'приключения',
  'семейный',
  'телевизионный фильм',
  'триллер',
  'ужасы',
  'фантастика',
  'фэнтези',
];

const genresEn = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'Science Fiction',
    'TV Movie',
    'Thriller',
    'War',
    'Western',
];

export default function genresShow() {
    if (moviesApiService.language === 'ru') {
        const item = genresRu.map(value => {
            return `<li class="genre">${value}</li>`
        }).join('');

    refs.genresDiv.innerHTML = item;
    } else {
        const item = genresEn.map(value => {
            return `<li class="genre">${value}</li>`
        }).join('');

    refs.genresDiv.innerHTML = item;
    }
}