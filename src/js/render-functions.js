import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.getElementById('load-more');
let lightbox;

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
      <a href="${largeImageURL}" class="gallery-link">
        <img src="${webformatURL}" alt="${tags}" loading="lazy">
      </a>
      <div class="image-info">
        <p>❤️ ${likes}</p>
        <p>👁️ ${views}</p>
        <p>💬 ${comments}</p>
        <p>⬇️ ${downloads}</p>
      </div>
    </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block';
  loader.classList.add('visible');
}

export function hideLoader() {
  loader.style.display = 'none';
  loader.classList.remove('visible');
}

export function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
  // loadMoreButton.classList.add('hidden');
  loadMoreButton.style.display = 'none';
}
