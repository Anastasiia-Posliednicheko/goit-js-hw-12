import { fetchImages } from './js/pixabay-api';
import { renderGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1; 
let currentQuery = '';  
let totalHits = 0;
const perPage = 15;

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.button-load');
const gallery = document.querySelector('.gallery');

loadMoreButton.style.display = 'none';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const searchQuery = event.target.elements['search-text'].value.trim();

    if (!searchQuery) { 
        iziToast.warning({
            message: 'Please enter a search query!',
            position: 'topRight',
        });
        return; 
    }
    if (searchQuery !== currentQuery) {
        currentPage = 1;
        currentQuery = searchQuery;
    }

    showLoader();
 
    try {
         const { hits, totalHits: newTotalHits } = await fetchImages(searchQuery, currentPage, perPage);
        totalHits = newTotalHits;
        renderGallery(hits);
        scrollToNewImages();

        if (hits.length > 0 && currentPage * perPage < totalHits) {
            loadMoreButton.style.display = 'block'; 
        } else {
            loadMoreButton.style.display = 'none'; 
        }
    } catch (error) {
        console.error(error);
    } finally {
        hideLoader();
    }
});

loadMoreButton.addEventListener('click', async () => {
    if (currentPage * perPage >= totalHits) {
        loadMoreButton.style.display = 'none';
        return;
     }
    
    currentPage += 1;
    showLoader();
    
 try {
     const { hits } = await fetchImages(currentQuery, currentPage, perPage)
           renderGallery(hits); 
           scrollToNewImages();
     
        if (currentPage * perPage < totalHits) {
            loadMoreButton.style.display = 'block'; 
        } else {
            loadMoreButton.style.display = 'none'; 
        }
    } catch (error) {
        console.error(error);
    } finally {
        hideLoader();
    }
});

const scrollToNewImages = () => {
  const galleryItem = gallery.querySelector('.gallery-item'); 
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height; 
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth', 
    });
  }
};
