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

const lightBoxInstance = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const onFormSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = input.value.trim();
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

    fetchImages(query)
        .then(data => {
            loader.classList.add('hidden');
            if (data.total === 0) {
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
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            form.reset();
        });
}

form.addEventListener("submit", onFormSubmit);
