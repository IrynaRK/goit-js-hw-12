import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const loadMoreButton = document.getElementById('load-more');
let currentQuery = '';
let currentPage = 1;
let totalLoadedImages = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = event.target.elements['search-text'].value.trim();
  currentPage = 1;
  totalLoadedImages = 0;

  if (!currentQuery) {
    return iziToast.error({ message: 'Будь ласка, введіть запит!' });
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMoreButton();
    } else {
      createGallery(response.hits);
      totalLoadedImages = response.hits.length;

      if (totalLoadedImages + response.hits.length <= response.totalHits) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        iziToast.info({ message: "You've reached the end of search results." });
      }
    }
  } catch (error) {
    handleError(error);
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    if (!response || !response.hits || response.hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({ message: "You've reached the end of search results." });
    } else {
      createGallery(response.hits);
      totalLoadedImages += response.hits.length;

      console.log(
        `Завантажено: ${totalLoadedImages}, Всього доступно: ${response.totalHits}`
      );

      if (totalLoadedImages >= response.totalHits) {
        // hideLoadMoreButton();
        iziToast.info({ message: "You've reached the end of search results." });
      } else {
        showLoadMoreButton();
      }
      window.scrollBy({
        top: document.querySelector('.gallery').offsetHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    handleError(error);
  }
});

function handleError(error) {
  console.error('Помилка отримання зображень:', error.message || error);
  iziToast.error({ message: 'Не вдалося завантажити зображення!' });
}
