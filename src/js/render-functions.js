import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

export const clearGallery = () => {
  gallery.innerHTML = '';
};

export const renderGallery = (images) => {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" class="gallery-image"/>
        </a>
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${likes}</p>
          <p class="info-item"><b>Views:</b> ${views}</p>
          <p class="info-item"><b>Comments:</b> ${comments}</p>
          <p class="info-item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>
    `;
  }).join('');
  
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export const showLoader = () => { 
  const loader = document.querySelector('.loader');
  loader.classList.add('show');
};

export const hideLoader = () => {  
  const loader = document.querySelector('.loader');
  loader.classList.remove('show');
};
