export function renderGalleryItem(items) {
    return items
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
            `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img
                    class="gallery-image"
                    src="${webformatURL}"
                    data-source="${largeImageURL}"
                    alt="${tags}"
                    width=360
                    height=200
                />

            </a>
            <ul class='metadata'>
                <li>
                    <p class='metadata-heading'>Likes</p>
                    <p>${likes}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Views</p>
                    <p>${views}</p>
                </li>
                <li>
                    <p class='metadata-heading'>Comments</p>
                    <p>${comments}</p>
                </li>
                <li>
                    <p metadata-heading>Downloads</p>
                    <p>${downloads}</p>
                </li>
            </ul>
        </li>`
      )
      .join('');
  }
