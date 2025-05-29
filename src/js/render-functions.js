import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export async function fetchImages(query) {
  const API_URL = `https://pixabay.com/api/?key=YOUR_API_KEY&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15`;

  toggleLoader(true); // Показуємо лоадер

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }
    const data = await response.json();
    toggleLoader(false); // Ховаємо лоадер
    return data.hits;
  } catch (error) {
    console.error('Помилка завантаження:', error);
    toggleLoader(false);
    return [];
  }
}

export function createGallery(images) {
  const galleryContainer = document.querySelector('.gallery');
  if (!galleryContainer) {
    console.error('Елемент .gallery не знайдено!');
    return;
  }
  clearGallery();

  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}" class="gallery-link">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
        </a>
        <div class="image-info">
          <p>❤️ ${image.likes}</p>
          <p>👁️ ${image.views}</p>
          <p>💬 ${image.comments}</p>
          <p>⬇️ ${image.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  galleryContainer.innerHTML = markup;

  // Оновлення SimpleLightbox
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

export function toggleLoader(show) {
  const loader = document.querySelector('.loader');
  if (!loader) {
    console.error('Елемент .loader не знайдено!');
    return;
  }
  if (show) {
    loader.classList.add('visible');
  } else {
    loader.classList.remove('visible');
  }
}

export async function searchImages(query) {
  const images = await fetchImages(query);
  if (images.length) {
    createGallery(images);
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('visible');
  } else {
    console.error('Елемент .loader не знайдено!');
  }
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('visible');
  } else {
    console.error('Елемент .loader не знайдено!');
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    const images = gallery.querySelectorAll('.gallery-item');
    images.forEach(img => img.remove());
  } else {
    console.error('Елемент .gallery не знайдено!');
  }
}
function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = images
    .map(
      image => `
    <div class="image-card">
      <img src="${image.previewURL}" alt="${image.tags}">
      <p>${image.tags}</p>
    </div>
  `
    )
    .join('');
}

export default {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
};
