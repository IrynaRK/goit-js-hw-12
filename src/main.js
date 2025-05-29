import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    return iziToast.error({ message: 'Будь ласка, введіть запит!' });
  }

  clearGallery();
  showLoader();

  try {
    const { hits } = await getImagesByQuery(query);
    if (!hits?.length) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      console.log('Отримані зображення:', hits);

      createGallery(hits);
    }
  } catch (error) {
    handleError(error);
  }

  hideLoader();
});

function handleError(error) {
  console.error('Помилка отримання зображень:', error.message || error);
  iziToast.error({ message: 'Не вдалося завантажити зображення!' });
}
