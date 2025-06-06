import axios from 'axios';

export function fetchImages(query, page = 1) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '50594223-08a3a2e6b4d3e84c5c31a5d02',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    })
    .then(response => response.data)
    .catch(err => console.error(err));
}