import templateModalWindow from '../templates/modal-window.hbs';
import refs from './refs';

export default function modalWindowsForItems() {
  const itemsList = document.querySelectorAll('.js-item');

  itemsList.forEach((el, i) => {
    el.id = `${i + 0}`;
    el.addEventListener('click', e => {

      refs.modal.classList.add('open');
      refs.modal.innerHTML = templateModalWindow(
        movies.data.results[e.currentTarget.id]
      );
    });
  });
}
