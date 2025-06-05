import axios from 'axios';

export function fetchImages(query) {
  return axios
    .get('https://pixabay.com/api/', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        key: '50594223-08a3a2e6b4d3e84c5c31a5d02',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data)
    .catch(err => console.error(err));
}