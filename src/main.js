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
        gallery.innerHTML = ''; 
    }

    loadMoreButton.style.display = 'none'; 
    showLoader();
 
    try {
        const { hits, totalHits: newTotalHits } = await fetchImages(searchQuery, currentPage, perPage);
        totalHits = newTotalHits;

        if (hits.length === 0) {
            iziToast.info({
                message: 'No images found. Try a different search term!',
                position: 'topRight',
            });
            return;
        }

        renderGallery(hits);

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

loadMoreButton.addEventListener('click', async () => {
    if (currentPage * perPage >= totalHits) {
        loadMoreButton.style.display = 'none';
        return;
    }
    
    currentPage += 1;
    loadMoreButton.style.display = 'none'; 
    showLoader();
    
    try {
        const { hits } = await fetchImages(currentQuery, currentPage, perPage);
        renderGallery(hits);
        
        if (currentPage * perPage < totalHits) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }

        scrollToNewImages(); 
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
