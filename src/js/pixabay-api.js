import axios from 'axios';

const API_KEY = '47540419-36cc7af233202b3a7b66af182';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Помилка завантаження:', error);
    return { hits: [] };
  }
}
