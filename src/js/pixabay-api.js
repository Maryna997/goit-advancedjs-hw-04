import axios from 'axios';

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '50594223-08a3a2e6b4d3e84c5c31a5d02',
        q: query,
        page,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
