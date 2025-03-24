import axios from 'axios';

const API_KEY = '49328321-2a7d7ff1359a5be8e111f7854';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page, perPage) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    const totalHits = response.data.totalHits;

    return { hits: response.data.hits, totalHits };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
