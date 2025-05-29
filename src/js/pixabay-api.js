import axios from 'axios';

const API_KEY = '47540419-36cc7af233202b3a7b66af182';
const BASE_URL = 'https://pixabay.com/api/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
  },
});

function handleError(error) {
  console.error('Помилка отримання зображень:', error.message || error);
  return [];
}

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axiosInstance.get('', {
      params: { q: query, page },
    });
    console.log(response.data);
    if (!response.data.hits?.length) {
      console.warn(`Немає результатів для запиту: ${query}`);
    }
    return response.data.hits;
  } catch (error) {
    console.error('Помилка завантаження:', error);
    alert('Не вдалося завантажити зображення');

    return handleError(error);
  }
}
