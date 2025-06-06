import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./js/pixabay-api";
import { renderGalleryItem } from "./js/render-functions";

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightBoxInstance = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

let page = 1;
let query = '';

const onFormSubmit = async e => {
    try {
        e.preventDefault();
        const form = e.currentTarget;
        query = input.value.trim();
        input.value = '';

        if (query === '') {
            iziToast.warning({
            title: 'Caution',
            message: 'Please enter a query!',
            position: 'topRight',
            });
        
            return;
        }
        
        loader.classList.remove('hidden');

        gallery.innerHTML = '';

        loadMoreBtn.classList.add('hidden');

        page = 1;

        const data = await fetchImages(query, page);
        loader.classList.add('hidden');

        if (!data.hits.length) {
            gallery.innerHTML = '';

            return iziToast.show({
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
                color: 'red',
                position: 'topRight',
            });
        }

        gallery.innerHTML = renderGalleryItem(data.hits);
        lightBoxInstance.refresh();

        if (data.hits.length < data.totalHits) {
            loadMoreBtn.classList.remove('hidden');
            loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
        } else {
            loadMoreBtn.classList.add('hidden');
        }
    } catch (error) {
        console.log(error);
    } finally {
            form.reset();
        }
}

const onLoadMoreBtnClick = async ev => { 
    try {
        loader.classList.remove('hidden');
        page++;
        const data = await fetchImages(query, page);

        if (!data.hits.length) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });

            loadMoreBtn.classList.add('hidden');
            loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);

            return;
        }

        gallery.insertAdjacentHTML('beforeend', renderGalleryItem(data.hits));
        lightBoxInstance.refresh();
        smoothScroll();
        loader.classList.add('hidden');

        if (page * 15 >= data.totalHits) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
            
            loadMoreBtn.classList.add('hidden');
            loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
        }
    } catch (error) {
        console.log(error);
    }
};

function smoothScroll() {
    const item = document.querySelector('.gallery-item');
  
    if (item) {
      const { height } = item.getBoundingClientRect();
  
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  }

form.addEventListener("submit", onFormSubmit);