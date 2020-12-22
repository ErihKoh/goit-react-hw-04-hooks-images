const API_KEY = '18969292-6634fe46747360e3150bf5a1e';
const BASE_URL = `https://pixabay.com/api`;

function fetchImage({ imageQuery = '', currentPage = 1 } = {}) {
  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${imageQuery}&page=${currentPage}&per_page=12&key=${API_KEY}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`По вашему запросу ничего не найдено ${imageQuery}`),
    );
  });
}

const api = {
  fetchImage,
};

export default api;
