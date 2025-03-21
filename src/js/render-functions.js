import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const renderGallery = (images) => {
  const gallery = document.querySelector('.gallery');
 
    if (images.length === 0) {
    iziToast.info({
      message: "Sorry, there are no images matching your search query. Please try again!",
      position: "topRight",
    });
    return;
    }
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
  const lightbox = new SimpleLightbox('.gallery a');
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