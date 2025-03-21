import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

    if (response.data.hits.length === 0) {
      iziToast.info({
        message: "Sorry, no images match your search. Try again!",
        position: "topRight",
      });
      return { hits: [], totalHits };
      }
    
     if (totalHits <= page * perPage) {
      document.querySelector('.button-load').style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }

    return { hits: response.data.hits, totalHits };
  } catch (error) {
    iziToast.error({
      message: "Failed to fetch images. Please try again later!",
      position: "topRight",
    });
    console.error(error);
    throw error;
  }
};
